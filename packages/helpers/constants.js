export const COGNITO_USER_ATTRIBUTES = {
  ACTIVE_GROUP: 'custom:active_group',
  EMAIL: 'email',
  EMAIL_ALIAS: 'cognito:email_alias',
  EMAIL_VERIFIED: 'email_verified',
  FAMILY_NAME: 'family_name',
  GIVEN_NAME: 'given_name',
  GROUPS: 'cognito:groups',
  MFA_ENABLED: 'cognito:mfa_enabled',
  PHONE_NUMBER_VERIFIED: 'phone_number_verified',
  SUB: 'sub',
  USER_STATUS: 'cognito:user_status',
};

export const HEADERS = {
  ACTIVE_GROUP: 'x-spr-active-group',
  CLIENT_ID: 'x-spr-client-id',
  CONTENT_LENGTH: 'Content-Length',
  HC_PARENT_ID: 'x-spr-hc-parent-id',
  JWT: 'x-spr-jwt',
  TRACE_ID: 'x-spr-hc-trace-id',
  USER_ID: 'x-spr-user-id',
};

export const REGEXES = {
  UUID: '[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}',
  VERSION_NUMBER: '[0-9.]+',
};

export const UUID_PREFIXES = {
  USER: 'spr:user::',
};

export const STATUS_CODES = {
  BAD_REQUEST: 400,
};
