import * as constants from './constants';

export const postLexRunTime = (payload, meta) => ({
  type: constants.POST_LEX_RUN_TIME_REQUEST,
  meta,
  payload,
});
export const getBotData = (payload, meta) => ({
  type: constants.GET_LEX_BOT_REQUEST,
  meta,
  payload,
});
export const botData = data => ({ type: constants.GET_LEX_BOT_SUCCESS, data });
export const getLexRunTimeInfo = data => ({
  type: constants.POST_LEX_RUN_TIME_SUCCESS,
  data,
});
export const foundLexRunTimeError = error => ({
  type: constants.FOUND_LEX_RUN_TIME_ERROR,
  error,
});
export const clearLexRunTimeError = error => ({
  type: constants.CLEAR_LEX_RUN_TIME_ERROR,
  error,
});
export const getBrainTreeNonce = payload => ({
  type: constants.GET_BRAINTREE_NONCE_REQUEST,
  payload,
});
export const brainTreeNonce = nonce => ({
  type: constants.BRAINTREE_NONCE_VALUE,
  nonce,
});
export const clearNonce = () => ({
  type: constants.CLEAR_BRAINTREE_NONCE_VALUE,
});
export const uploadFileRequest = (payload, meta) => ({
  type: constants.UPLOAD_FILE_REQUEST,
  meta,
  payload,
});
export const getUploadedFileInfo = data => ({
  type: constants.UPLOAD_FILE_SUCCESS,
  data,
});
export const clearFileData = error => ({
  type: constants.CLEAR_FILE_DATA,
  error,
});
export const clearLexBotData = error => ({
  type: constants.CLEAR_LEX_BOT_DATA,
  error,
});
