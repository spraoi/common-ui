import { call, put, takeLatest } from 'redux-saga/effects';
import ReactGA from 'react-ga';
import * as aws from '@spraoi/legacy-aws';
import { spraoiConfig } from '@spraoi/legacy-aws/config';
import * as actions from './actions';
import * as constants from './constants';

const defaultState = {
  completeSignUpRequired: false,
  error: null,
  isAuthenticated: false,
  isInitializing: false,
  isLoading: false,
  mfaRequired: false,
  resetPasswordCodeSent: false,
  resetPasswordSuccess: false,
  userAttributes: {},
  verificationRequired: false,
};

const cache = {};

function* completeSignUp({ payload, meta }) {
  try {
    yield put(actions.setState({ isLoading: true }));
    const createDbUser = meta && meta.createDbUser ? meta.createDbUser : false;
    yield call(aws.completeSignUp, { ...payload, ...cache.signInResponse });

    const userAttributes = {
      ...aws.getUserAttributes(),
      ...payload.newAttributes,
    };

    if (!createDbUser) {
      yield call(aws.callApi, {
        body: { userAttributes },
        method: 'POST',
        path: '/user',
      });
    }

    yield put(
      actions.setState({
        ...defaultState,
        isAuthenticated: true,
        userAttributes,
      })
    );
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
  }
}

function* initSaga({ meta }) {
  try {
    if (SPRAOI_ENV.GOOGLE_ANALYTICS) {
      ReactGA.initialize(SPRAOI_ENV.GOOGLE_ANALYTICS);
    }

    yield call(aws.signInExternalResponse);

    const isAuthenticated = yield call(aws.isAuthenticated, true);
    const stateValues = {
      isAuthenticated,
      userAttributes: aws.getUserAttributes(),
    };
    const isAdmin =
      stateValues.userAttributes['cognito:groups'] &&
      stateValues.userAttributes['cognito:groups'].includes('admin');
    let shouldChangeState = true;
    if (!isAdmin && meta.shouldCheckDeviceStatus && isAuthenticated) {
      const isRegistered =
        localStorage.getItem(
          spraoiConfig.storageKeys.deviceAlreadyRegistered
        ) === 'true';
      const shouldSignIn = isRegistered && isAuthenticated;
      if (!shouldSignIn) {
        localStorage.setItem(
          spraoiConfig.storageKeys.deviceAlreadyRegistered,
          false
        );
        yield call(signOutSaga);
        shouldChangeState = false;
      }
    }
    if (shouldChangeState) {
      yield put(
        actions.setState({
          ...defaultState,
          ...stateValues,
        })
      );
    }
  } catch (e) {
    yield put(actions.setState({ ...defaultState, error: e }));
  }
}

function* resetPasswordSaga({ payload }) {
  try {
    const {
      newPassword,
      newPasswordConfirmation,
      onSuccess,
      verificationCode,
    } = payload;

    yield put(actions.setState({ isLoading: true }));

    if (newPassword !== newPasswordConfirmation) {
      throw new Error(constants.ERRORS.PASSWORDS_SHOULD_MATCH);
    }

    yield call(aws.resetPassword, {
      newPassword,
      user: cache.user,
      verificationCode,
    });

    yield put(
      actions.setState({
        ...defaultState,
        resetPasswordSuccess: true,
      })
    );

    if (onSuccess) onSuccess();
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
  }
}

function* sendResetPasswordCodeSaga({ payload, meta: { resolve, reject } }) {
  try {
    const { email } = payload;
    yield put(actions.setState({ isLoading: true }));
    cache.user = yield call(aws.sendResetPasswordCode, email);

    yield put(
      actions.setState({
        ...defaultState,
        resetPasswordCodeSent: true,
        userAttributes: { email },
      })
    );
    if (resolve) yield call(resolve);
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
    if (reject) yield call(reject);
  }
}

function* signInSaga({ payload, meta }) {
  try {
    yield put(actions.setState({ isLoading: true }));
    payload.user = yield call(aws.getNewUser, payload.email);
    const res = yield call(aws.signIn, payload);
    if (res && res.callbacks && res.user) {
      cache.signInResponse = res;
      yield put(
        actions.setState({
          ...defaultState,
          completeSignUpRequired: true,
        })
      );
      if (meta) meta.resolve({ completeSignUpRequired: true });
    } else {
      if (payload.attributeList) {
        yield call(aws.updateUserAttributes, payload.attributeList);
      }
      yield put(
        actions.setState({
          ...defaultState,
          isAuthenticated: true,
          userAttributes: aws.getUserAttributes(),
        })
      );
      if (meta) meta.resolve({ completeSignUpRequired: false });
    }
  } catch (e) {
    yield put(
      actions.setState({
        error: e,
        isLoading: false,
        userAttributes: { email: payload.email },
        verificationRequired: e.code === 'UserNotConfirmedException',
      })
    );
    if (
      meta &&
      e.code === 'UserNotConfirmedException' &&
      Object.keys(aws.getUserAttributes()).length <= 0
    ) {
      aws.setUserAttributes({ email: payload.email });
    }
    if (meta) meta.reject();
  }
}

function* signInExternalSaga({ payload }) {
  try {
    yield call(aws.signInExternal, payload);
  } catch (e) {
    yield put(actions.setState({ error: e }));
  }
}

function* signOutSaga() {
  try {
    yield call(aws.signOut);
    yield put(actions.setState(defaultState));
  } catch (e) {
    yield put(actions.setState({ ...defaultState, error: e }));
  }
}

function* userNameSignUpSaga({ payload }) {
  try {
    const { username, password, attributes, rememberMe = false } = payload;
    const userAttributes = {
      email: attributes.email,
      password,
      rememberMe,
      username,
    };
    yield put(actions.setState({ isLoading: true }));
    const signUpPayload = {
      ...payload,
      email: username,
    };
    yield call(aws.signUp, signUpPayload);
    aws.setUserAttributes(userAttributes);
    delete userAttributes.password;
    delete userAttributes.rememberMe;
    yield put(
      actions.setState({
        ...defaultState,
        userAttributes,
        verificationRequired: true,
      })
    );
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
  }
}

function* signUpSaga({ payload }) {
  try {
    const { email, password, rememberMe = false } = payload;
    const userAttributes = {
      email,
      password,
      rememberMe,
    };
    yield put(actions.setState({ isLoading: true }));
    yield call(aws.signUp, payload);
    aws.setUserAttributes(userAttributes);
    delete userAttributes.password;
    delete userAttributes.rememberMe;
    yield put(
      actions.setState({
        ...defaultState,
        userAttributes,
        verificationRequired: true,
      })
    );
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
  }
}

function* verifyUserNameSaga({ payload }) {
  try {
    const { username, email } = aws.getUserAttributes();
    const { onSuccess } = payload;
    yield put(actions.setState({ isLoading: true }));
    const user = yield call(aws.getNewUser, username || email);
    const verifyEmailPayload = {
      ...payload,
      user,
    };
    yield call(aws.verifyEmail, verifyEmailPayload);
    yield put(
      actions.setState({
        isLoading: false,
        verificationRequired: false,
      })
    );
    if (onSuccess) onSuccess();
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
  }
}

function* changePasswordSaga({ payload }) {
  try {
    const { newPassword, oldPassword, onSuccess } = payload;
    yield put(actions.setState({ isLoading: true }));

    yield call(aws.changePassword, {
      newPassword,
      oldPassword,
    });

    yield put(
      actions.setState({
        error: null,
        isLoading: false,
      })
    );

    if (onSuccess) onSuccess();
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
  }
}

function* updateUserAttributesSaga({ payload }) {
  try {
    const { attributeList, onSuccess } = payload;
    yield put(actions.setState({ isLoading: true }));
    yield call(aws.updateUserAttributes, attributeList);
    yield put(
      actions.setState({
        ...defaultState,
        error: null,
        isAuthenticated: true,
        isLoading: false,
        userAttributes: aws.getUserAttributes(),
      })
    );
    if (onSuccess) onSuccess();
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
  }
}

function* updateDeviceRegistrationStatusSaga({ payload }) {
  try {
    const { onSuccess, status } = payload;
    localStorage.setItem(
      spraoiConfig.storageKeys.deviceAlreadyRegistered,
      status
    );
    if (onSuccess) onSuccess();
  } catch (e) {
    yield put(actions.setState({ error: e }));
  }
}

function* updateDeviceStatusSaga() {
  try {
    yield call(aws.updateDeviceStatus);
  } catch (e) {
    yield put(actions.setState({ error: e }));
  }
}

export default function* sagas() {
  yield takeLatest(constants.AUTH_COMPLETE_SIGN_UP, completeSignUp);
  yield takeLatest(constants.AUTH_INIT, initSaga);
  yield takeLatest(constants.AUTH_RESET_PASSWORD, resetPasswordSaga);
  yield takeLatest(
    constants.AUTH_SEND_RESET_PASSWORD_CODE,
    sendResetPasswordCodeSaga
  );
  yield takeLatest(constants.AUTH_SIGN_IN, signInSaga);
  yield takeLatest(constants.AUTH_SIGN_IN_EXTERNAL, signInExternalSaga);
  yield takeLatest(constants.AUTH_SIGN_OUT, signOutSaga);
  yield takeLatest(constants.AUTH_SIGN_UP, signUpSaga);
  yield takeLatest(constants.AUTH_USERNAME_SIGN_UP, userNameSignUpSaga);
  yield takeLatest(constants.AUTH_VERIFY_USERNAME, verifyUserNameSaga);
  yield takeLatest(constants.AUTH_CHANGE_PASSWORD, changePasswordSaga);
  yield takeLatest(
    constants.AUTH_UPDATE_USER_ATTRIBUTES,
    updateUserAttributesSaga
  );
  yield takeLatest(
    constants.AUTH_UPDATE_DEVICE_REGISTRATION_STATUS,
    updateDeviceRegistrationStatusSaga
  );
  yield takeLatest(constants.AUTH_UPDATE_DEVICE_STATUS, updateDeviceStatusSaga);
}
