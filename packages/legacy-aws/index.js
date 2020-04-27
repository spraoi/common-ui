import { CognitoAuth } from 'amazon-cognito-auth-js';
import { v4 as uuidv4 } from 'uuid';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

import {
  CognitoIdentityCredentials,
  CognitoIdentityServiceProvider,
  LexModelBuildingService,
  LexRuntime,
  S3,
  SecretsManager,
  config as awsSdkConfig,
} from 'aws-sdk';

import Cookie from 'js-cookie';
import { awsConfig, spraoiConfig } from './config';
import { parseHashParams, parseLambdaError, trimObject } from './helpers';
import requestSigner, { buildCanonicalQueryString } from './requestSigner';

awsSdkConfig.update({ region: awsConfig.cognito.region });

/**
 * API Calls
 */

export async function callApi({
  body,
  headers = {},
  method = 'GET',
  path,
  queryParams = {},
}) {
  let endpoint = '';
  const newBody = body ? trimObject(body) : body;
  headers[spraoiConfig.headers.traceId] = uuidv4();
  headers[spraoiConfig.headers.userPoolId] = awsConfig.cognito.userPoolId;

  if (await isAuthenticated()) {
    const attr = getUserAttributes();

    if (attr.user_id && !headers[spraoiConfig.headers.userId]) {
      headers[spraoiConfig.headers.userId] = attr.user_id;
    }

    if (attr['custom:group_id'] && !headers[spraoiConfig.headers.groupId]) {
      headers[spraoiConfig.headers.groupId] = attr['custom:group_id'];
    }

    if (attr['custom:agent_id'] && !headers[spraoiConfig.headers.agentId]) {
      headers[spraoiConfig.headers.agentId] = attr['custom:agent_id'];
    }

    const signedRequest = requestSigner
      .newClient({
        region: awsConfig.apiGateway.region,
        endpoint: awsConfig.apiGateway.url,
        accessKey: awsSdkConfig.credentials.accessKeyId,
        secretKey: awsSdkConfig.credentials.secretAccessKey,
        sessionToken: awsSdkConfig.credentials.sessionToken,
      })
      .signRequest({ method, path, headers, queryParams, body: newBody });

    headers = signedRequest.headers;
    endpoint = signedRequest.url;
  } else {
    const queryString = buildCanonicalQueryString(queryParams);
    endpoint = `${awsConfig.apiGateway.url}${path}?${queryString}`;
    headers['content-type'] = headers['content-type'] || 'application/json'; // Add content type when the request is unsigned
  }
  let results = await fetch(endpoint, {
    method,
    headers,
    body: JSON.stringify(newBody),
  });
  results = await results.json();
  if (results.errorMessage) throw JSON.parse(results.errorMessage);
  return Promise.resolve(results);
}

/**
 * Cloud Storage
 */

function getS3Bucket(name) {
  return new S3({ apiVersion: '2006-03-01', params: { Bucket: name } });
}

export function uploadFiles({
  acl = 'public-read',
  bucket,
  path = '',
  files = [],
  onProgress = () => {},
}) {
  return new Promise((resolve, reject) => {
    const s3 = getS3Bucket(bucket);
    let uploadCount = 0;
    const uploadProgress = [];
    const uploadData = [];

    Array.from(files).forEach((file, i) => {
      uploadCount++;
      const split = file.name.split('.');
      const extension = split.pop();
      const name = split.join('.');
      const randomNumber = Math.random().toString(36).substring(2, 12);
      const fileName = `${path}${name}-${randomNumber}.${extension}`;

      const upload = s3.upload(
        { Key: fileName, Body: file, ACL: acl },
        (err, data) => {
          uploadCount--;
          uploadData[i] = data;
          if (err) reject(err);
          else if (!uploadCount) resolve(uploadData);
        }
      );

      upload.on('httpUploadProgress', (e) => {
        uploadProgress[i] = parseInt((e.loaded * 100) / e.total);
        onProgress(uploadProgress);
      });
    });
  });
}

export function deleteObjects({ bucket, path, files = [] }) {
  return new Promise((resolve, reject) => {
    const fileNames = [];
    files.map((file) => {
      fileNames.push({ Key: path + file });
    });
    const params = {
      Bucket: bucket,
      Delete: {
        Objects: fileNames,
      },
    };
    getS3Bucket(bucket).deleteObjects(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

export function listFiles({ bucket, prefix = '' }) {
  return new Promise((resolve, reject) => {
    getS3Bucket(bucket).listObjectsV2({ Prefix: prefix }, (err, data) => {
      if (err) reject(err);
      else resolve(data.Contents);
    });
  });
}

export function getSignedUrl({ bucket, file, expires = 1800 }) {
  return getS3Bucket(bucket).getSignedUrl('getObject', {
    Bucket: bucket,
    Key: file,
    Expires: expires,
  });
}

/**
 * User Auth
 */

function getFederatedAuthenticationHandler({
  identityProvider = null,
  onFailure = () => {},
  onSuccess = () => {},
}) {
  const { appClientId, domainPrefix, region, userPoolId } = awsConfig.cognito;
  const { protocol, hostname, pathname, port } = window.location;

  const redirect = `${protocol}//${hostname}${
    port ? ':' : ''
  }${port}${pathname}`;

  const auth = new CognitoAuth({
    AppWebDomain: `${domainPrefix}.auth.${region}.amazoncognito.com`,
    ClientId: appClientId,
    IdentityProvider: identityProvider,
    RedirectUriSignIn: redirect,
    RedirectUriSignOut: redirect,
    TokenScopesArray: [],
    UserPoolId: userPoolId,
  });

  auth.userhandler = { onSuccess, onFailure };

  return auth;
}

function getNewUserPool() {
  return new CognitoUserPool({
    UserPoolId: awsConfig.cognito.userPoolId,
    ClientId: awsConfig.cognito.appClientId,
  });
}

function getUserSession(currentUser) {
  return new Promise((resolve, reject) =>
    currentUser.getSession((err, session) =>
      err ? reject(err) : resolve(session)
    )
  );
}

function parseUserSession(session) {
  const token = session.getIdToken();
  const payload = token.decodePayload();
  setUserAttributes(payload);
  updateIdentityCredentials(token.getJwtToken());
  return Promise.resolve();
}

function updateIdentityCredentials(userToken) {
  const authenticator =
    `cognito-idp.${awsConfig.cognito.region}.` +
    `amazonaws.com/${awsConfig.cognito.userPoolId}`;

  if (
    !awsSdkConfig.credentials ||
    awsSdkConfig.credentials.params.Logins[authenticator] !== userToken
  ) {
    awsSdkConfig.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: awsConfig.cognito.identityPoolId,
      Logins: { [authenticator]: userToken },
    });
  }
}

export function completeSignUp({
  callbacks,
  newAttributes,
  newPassword,
  rememberMe = false,
  user,
}) {
  return new Promise((resolve, reject) =>
    user.completeNewPasswordChallenge(newPassword, newAttributes, {
      onSuccess: (session) => {
        rememberSession(rememberMe);
        parseUserSession(session);
        resolve();
      },

      onFailure: (err) => reject(parseLambdaError(err)),
    })
  );
}

export function getAllUserPool(body) {
  return new Promise((resolve, reject) => {
    const provider = new CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18',
    });
    provider.listUserPools(body, (err, data) =>
      err ? reject(err) : resolve(data)
    );
  });
}

export function getNewUser(username) {
  return new CognitoUser({
    Username: username.toLowerCase(),
    Pool: getNewUserPool(),
  });
}

export function getUserAttributes() {
  return (
    window[spraoiConfig.storageKeys.userAttributes] ||
    JSON.parse(localStorage.getItem(spraoiConfig.storageKeys.userAttributes)) ||
    {}
  );
}

export function getSecretKeyValues(secretName) {
  return new Promise((resolve, reject) => {
    const client = new SecretsManager();

    client.getSecretValue({ SecretId: secretName }, (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data.SecretString));
    });
  });
}

export async function isAuthenticated() {
  const currentUser = getNewUserPool().getCurrentUser();

  if (currentUser && isRemembered()) {
    try {
      parseUserSession(await getUserSession(currentUser));
      await awsSdkConfig.credentials.getPromise();
      return true;
    } catch (e) {}
  }

  signOut();
  return false;
}

export function isRemembered() {
  return (
    Cookie.get(spraoiConfig.storageKeys.rememberMe) === 'true' ||
    Cookie.get(spraoiConfig.storageKeys.sessionExists) === 'true'
  );
}

export function rememberSession(rememberMe) {
  Cookie.set(spraoiConfig.storageKeys.rememberMe, rememberMe, {
    expires: spraoiConfig.rememberMeDays,
  });
  Cookie.set(spraoiConfig.storageKeys.sessionExists, true);
}

export function resetPassword({ user, verificationCode, newPassword }) {
  return new Promise((resolve, reject) =>
    user.confirmPassword(verificationCode, newPassword, {
      onSuccess: (data) => resolve(data),
      onFailure: (err) => reject(parseLambdaError(err)),
    })
  );
}

export async function changePassword({ newPassword, oldPassword }) {
  const currentUser = getNewUserPool().getCurrentUser();
  parseUserSession(await getUserSession(currentUser));

  return new Promise((resolve, reject) =>
    currentUser.changePassword(oldPassword, newPassword, (err, data) => {
      if (err) reject(parseLambdaError(err));
      else resolve(data);
    })
  );
}

export function sendResetPasswordCode(email) {
  const user = getNewUser(email);

  return new Promise((resolve, reject) =>
    user.forgotPassword({
      onSuccess: () => resolve(user),
      onFailure: (err) => reject(err),
    })
  );
}

export async function updateUserAttributes(payload) {
  const currentUser = getNewUserPool().getCurrentUser();
  if (currentUser !== null) {
    parseUserSession(await getUserSession(currentUser));
    return new Promise((resolve, reject) =>
      currentUser.updateAttributes(payload, (err, result) => {
        if (err) reject(parseLambdaError(err));
        else {
          const newUserAttributes = {};
          payload.forEach((data, index) => {
            newUserAttributes[data.Name] = data.Value;
          });
          setUserAttributes({
            ...getUserAttributes(),
            ...newUserAttributes,
          });
          resolve(result);
        }
      })
    );
  }
}

export function setUserAttributes(attributes) {
  if (attributes.sub) {
    attributes.user_id = spraoiConfig.userIdPrefix + attributes.sub;
  }
  window[spraoiConfig.storageKeys.userAttributes] = attributes;
  localStorage.setItem(
    spraoiConfig.storageKeys.userAttributes,
    JSON.stringify(attributes)
  );
}

export function signIn({ email, password, rememberMe = false, user }) {
  return new Promise((resolve, reject) => {
    const callbacks = {
      onSuccess: (session) => {
        rememberSession(rememberMe);
        parseUserSession(session);
        resolve();
      },
      onFailure: (err) => reject(parseLambdaError(err)),
    };

    callbacks.newPasswordRequired = () =>
      resolve({ callbacks, user, rememberMe });
    const authenticationDetails = new AuthenticationDetails({
      Username: email.toLowerCase(),
      Password: password,
    });

    user.authenticateUser(authenticationDetails, callbacks);
  });
}

export function signInExternal(identityProvider) {
  const auth = getFederatedAuthenticationHandler({ identityProvider });
  auth.getSession();
}

export function signInExternalResponse() {
  return new Promise((resolve, reject) => {
    const { error_description, id_token } = parseHashParams();
    if (error_description) reject(parseLambdaError(error_description));
    if (!id_token) resolve();

    const onSuccess = () => {
      rememberSession(true);
      resolve();
    };

    const auth = getFederatedAuthenticationHandler({
      onSuccess,
      onFailure: (err) => reject(parseLambdaError(err)),
    });

    auth.parseCognitoWebResponse(window.location.href);
  });
}

export function signOut() {
  const currentUser = getNewUserPool().getCurrentUser();
  if (currentUser !== null) currentUser.signOut();
  if (awsSdkConfig.credentials) awsSdkConfig.credentials.clearCachedId();

  // clear cached user attributes
  delete window[spraoiConfig.storageKeys.userAttributes];
  localStorage.removeItem(spraoiConfig.storageKeys.userAttributes);
}

export function signUp({ email, password, attributes = {} }) {
  const userAttributes = [];

  Object.entries(attributes).forEach(([key, value]) => {
    userAttributes.push(new CognitoUserAttribute({ Name: key, Value: value }));
  });

  return new Promise((resolve, reject) =>
    getNewUserPool().signUp(
      email.toLowerCase(),
      password,
      userAttributes,
      null,
      (err, res) => (err ? reject(parseLambdaError(err)) : resolve(res.user))
    )
  );
}

export function verifyEmail({ user, verificationCode }) {
  return new Promise((resolve, reject) =>
    user.confirmRegistration(verificationCode, true, (err, result) =>
      err ? reject(err) : resolve(result)
    )
  );
}

/**
 * Lex
 */

export function getBotDetails(body) {
  return new Promise((resolve, reject) => {
    const modelBuilder = new LexModelBuildingService();
    modelBuilder.getBot(body, (err, data) =>
      err ? reject(err) : resolve(data)
    );
  });
}

export function postTestMessage(body) {
  return new Promise((resolve, reject) => {
    const lex = new LexRuntime({ apiVersion: '2016-11-28' });
    lex.postText(body, (err, data) => (err ? reject(err) : resolve(data)));
  });
}
