import * as constants from './constants';

export const completeSignUp = payload => ({
  type: constants.AUTH_COMPLETE_SIGN_UP,
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

export const signIn = payload => ({
  type: constants.AUTH_SIGN_IN,
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
