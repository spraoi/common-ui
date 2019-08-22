import * as constants from './constants';

const initialState = {
  lexRunTimeData: null,
  brainTreeNonceVal: null,
  error: null,
  botData: null,
  fileData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.POST_LEX_RUN_TIME_REQUEST:
      return Object.assign({}, state, {
        error: null,
        lexRunTimeData: action.data,
      });
    case constants.POST_LEX_RUN_TIME_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        lexRunTimeData: action.data,
      });
    case constants.CLEAR_LEX_BOT_DATA:
      return Object.assign({}, state, {
        lexRunTimeData: null,
      });
    case constants.GET_LEX_BOT_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        botData: action.data,
      });
    case constants.BRAINTREE_NONCE_VALUE:
      return Object.assign({}, state, {
        error: null,
        brainTreeNonceVal: action.nonce,
      });
    case constants.UPLOAD_FILE_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        fileData: action.data,
      });
    case constants.CLEAR_FILE_DATA:
      return Object.assign({}, state, {
        fileData: null,
      });
    case constants.FOUND_LEX_RUN_TIME_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });
    case constants.CLEAR_LEX_RUN_TIME_ERROR:
      return Object.assign({}, state, {
        error: null,
      });
    case constants.CLEAR_BRAINTREE_NONCE_VALUE:
      return Object.assign({}, state, {
        brainTreeNonceVal: null,
      });
    default:
      return state;
  }
};

export default reducer;
