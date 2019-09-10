import * as constants from './constants';

export const completeSignUp = (payload, meta) => ({
  type: constants.AUTH_COMPLETE_SIGN_UP,
  meta,
  payload,
});

export const init = () => ({
  type: constants.AUTH_INIT,
});

export const resetPassword = payload => ({
  type: constants.AUTH_RESET_PASSWORD,
  payload,
});

export const sendResetPasswordCode = payload => ({
  type: constants.AUTH_SEND_RESET_PASSWORD_CODE,
  payload,
});

export const setState = payload => ({
  type: constants.AUTH_SET_STATE,
  payload,
});

export const signIn = (payload, meta) => ({
  type: constants.AUTH_SIGN_IN,
  meta,
  payload,
});

export const signInExternal = payload => ({
  type: constants.AUTH_SIGN_IN_EXTERNAL,
  payload,
});

export const signOut = () => ({
  type: constants.AUTH_SIGN_OUT,
});

export const signUp = payload => ({
  type: constants.AUTH_SIGN_UP,
  payload,
});

export const verifyEmail = payload => ({
  type: constants.AUTH_VERIFY_EMAIL,
  payload,
});

export const changePassword = payload => ({
  type: constants.AUTH_CHANGE_PASSWORD,
  payload,
});

export const updateUserAttributes = payload => ({
  type: constants.AUTH_UPDATE_USER_ATTRIBUTES,
  payload,
});
