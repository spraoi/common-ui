export const COGNITO_USER_ATTRIBUTES = {
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
  CLIENT_ID: 'x-spr-client-id',
  CONTENT_LENGTH: 'Content-Length',
  HC_PARENT_ID: 'x-spr-hc-parent-id',
  TRACE_ID: 'x-spr-trace-id',
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
