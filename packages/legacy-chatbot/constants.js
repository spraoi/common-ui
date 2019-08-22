export const POST_LEX_RUN_TIME_REQUEST = 'POST_LEX_RUN_TIME_REQUEST';
export const GET_LEX_BOT_REQUEST = 'GET_LEX_BOT_REQUEST';
export const GET_LEX_BOT_SUCCESS = 'GET_LEX_BOT_SUCCESS';
export const POST_LEX_RUN_TIME_SUCCESS = 'POST_LEX_RUN_TIME_SUCCESS';
export const FOUND_LEX_RUN_TIME_ERROR = 'FOUND_LEX_RUN_TIME_ERROR';
export const CLEAR_LEX_RUN_TIME_ERROR = 'CLEAR_LEX_RUN_TIME_ERROR';
export const GET_BRAINTREE_NONCE_REQUEST = 'GET_BRAINTREE_NONCE_REQUEST';
export const BRAINTREE_NONCE_VALUE = 'BRAINTREE_NONCE_VALUE';
export const CLEAR_BRAINTREE_NONCE_VALUE = 'CLEAR_BRAINTREE_NONCE_VALUE';
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const CLEAR_FILE_DATA = 'CLEAR_FILE_DATA';
export const CLEAR_LEX_BOT_DATA = 'CLEAR_LEX_BOT_DATA';

export const MESSAGES = {
  introduction:
    'Hello, can I help you with your insurance product purchase today? Please type "Yes" to continue.',
  reject: 'Okay, Thank you!',
  rejectReportClaim:
    'Okay. You can report a claim later if you want. Thank you!',
  apiError: 'I’m sorry. Can you please try after some time?',
  agentRequest: 'I would like to setup client’s account',
  userRequest: 'I would like to buy an insurance',
  inProgressMessage: 'Typing...',
  placeholder: 'Reply...',
  attachFileText:
    "You can attach more files if you want. If you have attached all required files then press 'Yes' to continue.",
  quoteInfoInProgressMessage:
    'We are now generating a quote for you. Thank you for your patience.',
  productInfoInProgressMessage:
    'We are now fetching the quote information for you. Thank you for your patience.',
  saveCreditCardInProgressMessage:
    'We are now generating a contract for you. Thank you for your patience.',
  successfulPerchaseMessage:
    'You have successfully purchased your insurance. Would you like to continue with updating information?',
  updateTextMessage:
    'Please select the option you want to update from the list below.',
};

export const ATTACHMENT_ICON_COLOR = {
  ENABLE: '#78919e',
  DISABLE: '#9db7c140',
};
