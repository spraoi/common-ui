import * as constants from './constants';

export const completeSignUp = (payload, meta) => ({
  meta,
  payload,
  type: constants.AUTH_COMPLETE_SIGN_UP,
});

export const init = () => ({
  type: constants.AUTH_INIT,
});

export const resetPassword = payload => ({
  payload,
  type: constants.AUTH_RESET_PASSWORD,
});

export const sendResetPasswordCode = payload => ({
  payload,
  type: constants.AUTH_SEND_RESET_PASSWORD_CODE,
});

export const setState = payload => ({
  payload,
  type: constants.AUTH_SET_STATE,
});

export const signIn = (payload, meta) => ({
  meta,
  payload,
  type: constants.AUTH_SIGN_IN,
});

export const signInExternal = payload => ({
  payload,
  type: constants.AUTH_SIGN_IN_EXTERNAL,
});

export const signOut = () => ({
  type: constants.AUTH_SIGN_OUT,
});

export const signUp = payload => ({
  payload,
  type: constants.AUTH_SIGN_UP,
});

export const userNameSignUp = payload => ({
  payload,
  type: constants.AUTH_USERNAME_SIGN_UP,
});

export const verifyUserName = payload => ({
  payload,
  type: constants.AUTH_VERIFY_USERNAME,
});

export const changePassword = payload => ({
  payload,
  type: constants.AUTH_CHANGE_PASSWORD,
});

export const updateUserAttributes = payload => ({
  payload,
  type: constants.AUTH_UPDATE_USER_ATTRIBUTES,
});
