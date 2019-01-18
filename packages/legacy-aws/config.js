export const awsConfig = {
  apiGateway: SPRAOI_ENV.API_GATEWAY_CONFIG,
  cognito: SPRAOI_ENV.COGNITO_CONFIG,
};

export const spraoiConfig = {
  headers: {
    agentId: 'x-spr-agent-id',
    groupId: 'x-spr-group-id',
    userId: 'x-spr-user-id',
    userPoolId: 'x-spr-pool-id',
  },
  rememberMeDays: 30,
  storageKeys: {
    rememberMe: 'spr-remember-me',
    sessionExists: 'spr-session-exists',
    userAttributes: 'spr-user-attributes',
  },
  userIdPrefix: 'spr:user::',
};
