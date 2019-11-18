import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getBotData,
  postLexRunTime,
  getBrainTreeNonce,
  clearLexRunTimeError,
  clearNonce,
  uploadFileRequest,
  clearFileData,
  clearLexBotData,
} from '../actions';
import Body from './Body';
import './ChatBot.css';
import { MESSAGES, ATTACHMENT_ICON_COLOR } from '../constants';
let lexUserId = 'CommonUIChatbotUser' + Date.now();

@connect(
  state => ({
    lexRunTimeData: state.lex.lexRunTimeData,
    brainTreeNonceVal: state.lex.brainTreeNonceVal,
    error: state.lex.error,
    botData: state.lex.botData,
    fileData: state.lex.fileData,
  }),
  {
    postLexRunTime: postLexRunTime,
    getBotData: getBotData,
    getBrainTreeNonce: getBrainTreeNonce,
    clearLexRunTimeError: clearLexRunTimeError,
    clearNonce: clearNonce,
    uploadFileRequest: uploadFileRequest,
    clearFileData: clearFileData,
    clearLexBotData: clearLexBotData,
  }
)
export default class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: MESSAGES.placeholder,
      sessionAttributes:
        Object.keys(this.props.properties.userData).length > 0
          ? {
              currentData: JSON.stringify({
                userSession: this.props.properties.userData,
                header: {},
                userInfo: {},
                createUserInfo: {},
              }),
            }
          : {},
      message: '',
      isButton: false,
      messageArray: this.props.messageArray,
      errorClass: '',
      callLexFunc: false,
      lastSlotName: '',
      intentName: '',
      dialogState: '',
      updateTime: 0,
      idleSessionTTLInSeconds: 0,
      idleSessionTime: 0,
      showIdleSessionMessage: false,
      saveCreditCardMsg: '',
      creditCardSaved: false,
      disableInput: false,
      inputFocus: '',
      selectedFile: '',
      validationFile: false,
      images: [],
      enableAttachmentIcon: false,
      attachmentIconColor: ATTACHMENT_ICON_COLOR.DISABLE,
      before5minTimeOutMessage: '',
      timeOutMessage: '',
      intervalTime: 5,
      cardAction: '',
      fileArray: '',
    };
  }

  // clear chat box data
  clearChat = () => {
    let array = [
      {
        message: '',
        reply: MESSAGES.introduction,
        responseCardAttachments: [],
        messageTime: '',
        replyTime: new Date(),
      },
    ];
    this.setState({
      placeholder: MESSAGES.placeholder,
      sessionAttributes:
        Object.keys(this.props.properties.userData).length > 0
          ? {
              currentData: JSON.stringify({
                userSession: this.props.properties.userData,
                header: {},
                userInfo: {},
                createUserInfo: {},
              }),
            }
          : {},
      message: '',
      messageArray: array,
      errorClass: '',
      showIdleSessionMessage: false,
      idleSessionTime: 0,
    });
    this.enableInput(); // enable input text
  };

  // calls when any component gets updated
  componentDidUpdate() {
    // on getting reponse from lex
    if (this.props.lexRunTimeData && this.state.callLexFunc === true) {
      let data = this.props.lexRunTimeData;
      this.props.clearLexBotData(); // clear lex data
      let sessionAttributes = data.sessionAttributes;

      if (
        (data.intentName === 'CreditCardInformation' ||
          data.intentName === 'AddRemoveCreditCard') &&
        (data.dialogState === 'Fulfilled' || data.dialogState === 'Failed')
      ) {
        sessionAttributes = Object.assign({}, data.sessionAttributes, {
          nonce: null,
        });
        this.setState({ creditCardSaved: false });
        this.props.clearNonce();
      }
      this.setState({
        cardAction: '',
        sessionAttributes: sessionAttributes,
        idleSessionTime: 0,
        showIdleSessionMessage: true,
      }); // capture the sessionAttributes for the next cycle
      let len = this.state.messageArray.length;
      let message = '';
      let responseCard = [];
      if (data.message) {
        message = data.message;
        message = message.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      }
      if (
        data.responseCard &&
        data.responseCard.genericAttachments &&
        data.responseCard.genericAttachments.length > 0
      )
        responseCard = data.responseCard.genericAttachments;

      // highlight selected primary address
      if (
        data.intentName === 'UpdateAddress' &&
        data.slotToElicit === 'addressId' &&
        data.dialogState === 'ElicitSlot'
      ) {
        responseCard.map(function(obj) {
          if (obj.buttons) {
            obj.buttons.map(function(obj1) {
              if (obj1.value === data.sessionAttributes.primaryLocationId)
                obj1.selectedClass = 'selected-button disable-chatbot-button';
            });
          }
        });
      }

      if (
        data.intentName == 'CreditCardInformation' &&
        data.dialogState == 'Fulfilled'
      ) {
        message += MESSAGES.successfulPerchaseMessage;
      }

      if (
        this.state.messageArray[len - 1].reply ===
          MESSAGES.quoteInfoInProgressMessage ||
        this.state.messageArray[len - 1].reply ===
          MESSAGES.productInfoInProgressMessage ||
        this.state.messageArray[len - 1].reply ===
          MESSAGES.saveCreditCardInProgressMessage
      ) {
        let array = this.state.messageArray;
        array.push({
          message: '',
          reply: message,
          responseCardAttachments: responseCard,
          messageTime: '',
          replyTime: new Date(),
          images: [],
          imageTime: '',
        });
      } else {
        this.state.messageArray[len - 1].reply = message;
        this.state.messageArray[len - 1].responseCardAttachments = responseCard;
        this.state.messageArray[len - 1].replyTime = new Date();
      }

      // if the session is closed
      if (
        data.dialogState === 'Fulfilled' ||
        data.dialogState === 'Failed' ||
        data.dialogState === 'ElicitIntent'
      ) {
        this.setState({ showIdleSessionMessage: false });
      }
      this.setState({
        messageArray: this.state.messageArray,
        callLexFunc: false,
        lastSlotName: data.slotToElicit,
        cardAction: '',
        intentName: data.intentName,
        dialogState: data.dialogState,
      });

      // enable upload file attachment functionality
      if (
        data.intentName === 'ReportAClaim' &&
        data.dialogState === 'ElicitSlot' &&
        data.slotToElicit === 'uploadFile'
      ) {
        this.setState({
          attachmentIconColor: ATTACHMENT_ICON_COLOR.ENABLE,
          enableAttachmentIcon: true,
          disableInput: true,
        });
      } else {
        // disable upload file attachment functionality
        this.setState({
          attachmentIconColor: ATTACHMENT_ICON_COLOR.DISABLE,
          enableAttachmentIcon: false,
        });
        this.enableInput(); // enable input text
      }

      // scroll to the end of the conversation
      if (this.state.messageArray && this.state.messageArray.length > 0) {
        let len = this.state.messageArray.length - 1;
        let scroll = this;
        setTimeout(function() {
          scroll.scrollDown('chatbot-reply-' + len);
        }, 50);
      }
    }

    // call lex API for saving credit card details
    if (
      this.state.creditCardSaved === false &&
      this.props.brainTreeNonceVal &&
      ((this.state.lastSlotName == 'saveCard' &&
        this.state.intentName == 'CreditCardInformation' &&
        this.state.dialogState == 'ElicitSlot') ||
        (this.state.intentName == 'AddRemoveCreditCard' &&
          this.state.cardAction == 'add' &&
          this.state.dialogState == 'ConfirmIntent'))
    ) {
      // call lex api after nonce is generated
      this.callLex();
    }

    // fetch idle session time in sections
    if (
      this.props.botData &&
      this.props.botData.idleSessionTTLInSeconds &&
      this.state.idleSessionTTLInSeconds === 0
    ) {
      let before5minTimeOutMessage =
        'You have been inactive for ' +
        parseInt(
          (this.props.botData.idleSessionTTLInSeconds -
            this.state.intervalTime * 60) /
            60
        ) +
        ' min. Would you like to continue?';
      let timeOutMessage =
        'Sorry, you cannot proceed because you have been inactive for ' +
        parseInt(this.props.botData.idleSessionTTLInSeconds / 60) +
        ' min. Please start over.';
      this.setState({
        idleSessionTTLInSeconds: this.props.botData.idleSessionTTLInSeconds,
        before5minTimeOutMessage: before5minTimeOutMessage,
        timeOutMessage: timeOutMessage,
      });
    }

    // fetch uploaded file details
    if (this.props.fileData) {
      let images = this.state.images;
      images.push(this.props.fileData[0].Location);
      this.setState({ images: images });
      this.handleImageChange();
      this.props.clearFileData(); // clear uploaded file data
    }

    // display error
    if (this.props.error) {
      // display error message if api throws error
      let array = this.state.messageArray;
      let len = array.length;
      if (array[len - 1].reply === MESSAGES.inProgressMessage) {
        array[len - 1].reply = MESSAGES.apiError;
      } else {
        array.push({
          message: '',
          /*errorMsg: 'errorMsg',*/
          reply: MESSAGES.apiError,
          responseCardAttachments: [],
          messageTime: '',
          replyTime: new Date(),
          images: [],
          imageTime: '',
        });
      }
      this.setState({
        isButton: false,
        callLexFunc: true,
        disableInput: false,
        placeholder: MESSAGES.placeholder,
        sessionAttributes:
          Object.keys(this.props.properties.userData).length > 0
            ? {
                currentData: JSON.stringify({
                  userSession: this.props.properties.userData,
                  header: {},
                  userInfo: {},
                  createUserInfo: {},
                }),
              }
            : {},
        message: '',
        messageArray: array,
        errorClass: '',
        showIdleSessionMessage: false,
        idleSessionTime: 0,
      });

      // scroll to the end of the conversation
      let scroll = this;
      setTimeout(function() {
        if (array && array.length > 0) {
          let len = array.length - 1;
          scroll.scrollDown('chatbot-reply-' + len);
        }
      }, 50);
      this.enableInput(); // enable input text
      this.props.clearLexRunTimeError(); // clear all errors
    }
  }

  componentDidMount() {
    // scroll to the end of the conversation on opening the chat
    let objDiv = document.getElementById('chatbot-chatbox');
    objDiv.scrollTop = objDiv.scrollHeight;

    /*call time function every 5 seconds*/
    this.interval = setInterval(
      this.updateTimeState,
      this.state.intervalTime * 1000
    );

    /*get amazon lex session timeout in seconds*/
    let params = {
      name: this.props.properties.botName /* required */,
      versionOrAlias: this.props.properties.botAlias /* required */,
    };
    this.callBasicLexData(params);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  scrollDown = elementId => {
    let elementObject = document.getElementById(elementId);
    if (elementObject) elementObject.scrollIntoView();
  };

  // time update every 5 seconds
  updateTimeState = () => {
    let msgtime = 300; // in seconds
    let array = this.state.messageArray;
    this.setState({
      updateTime: this.state.updateTime + 1,
      idleSessionTime: this.state.idleSessionTime + this.state.intervalTime,
    });

    // display messages on user inactivity on session timeout and 5 minute before session timeout respectively
    if (this.state.showIdleSessionMessage === true) {
      if (
        this.state.idleSessionTime >= this.state.idleSessionTTLInSeconds &&
        this.state.idleSessionTime <
          this.state.idleSessionTTLInSeconds + this.state.intervalTime
      ) {
        array.push({
          message: '',
          reply: this.state.timeOutMessage,
          responseCardAttachments: [],
          messageTime: '',
          replyTime: new Date(),
          images: [],
          imageTime: '',
        });
        this.setState({ messageArray: array, showIdleSessionMessage: false });
        this.enableInput(); // enable input text
        // scroll to the end of conversation
        let len = this.state.messageArray.length - 1;
        this.scrollDown('chatbot-reply-' + len);
      } else if (
        this.state.idleSessionTime >
          this.state.idleSessionTTLInSeconds -
            msgtime -
            this.state.intervalTime &&
        this.state.idleSessionTime <=
          this.state.idleSessionTTLInSeconds - msgtime
      ) {
        array.push({
          message: '',
          reply: this.state.before5minTimeOutMessage,
          responseCardAttachments: [],
          messageTime: '',
          replyTime: new Date(),
          images: [],
          imageTime: '',
        });
        this.setState({ messageArray: array });
        this.enableInput(); // enable input text
        // scroll to the end of the conversation
        let len = this.state.messageArray.length - 1;
        this.scrollDown('chatbot-reply-' + len);
      }
    }
  };

  inProgressMessage = val => {
    let reply = MESSAGES.inProgressMessage;
    if (
      this.state.dialogState === 'ElicitSlot' &&
      this.state.intentName === 'QuoteDetailInformation' &&
      this.state.lastSlotName === 'applicantIncidence'
    ) {
      reply = MESSAGES.quoteInfoInProgressMessage;
    } else if (
      val &&
      val.toString().toLowerCase() === 'yes' &&
      this.state.dialogState === 'ConfirmIntent' &&
      this.state.intentName === 'QuoteDetailInformation' &&
      this.state.sessionAttributes.paymentReview !== true &&
        this.state.sessionAttributes.paymentReview !== 'true'
    ) {
      reply = MESSAGES.productInfoInProgressMessage;
    } else if (
      val &&
      val.toString().toLowerCase() === 'yes' &&
      this.state.dialogState === 'ElicitSlot' &&
      this.state.intentName === 'CreditCardInformation' &&
      this.state.lastSlotName === 'saveCard'
    ) {
      reply = MESSAGES.saveCreditCardInProgressMessage;
    }
    return reply;
  };

  clickButton(val, i, j, k) {
    //on click button
    let isSelected = true;
    if (
      this.state.messageArray[i].responseCardAttachments[j].buttons[k]
        .selectedClass &&
      this.state.messageArray[i].responseCardAttachments[j].buttons[
        k
      ].selectedClass.includes('disable-chatbot-button')
    ) {
      isSelected = false;
    }
    if (isSelected) {
      // only if selected button is not clicked
      // highlight selected button
      this.state.messageArray[i].responseCardAttachments.map(function(obj) {
        if (obj.buttons) {
          obj.buttons.map(function(obj1) {
            obj1.selectedClass = '';
          });
        }
      });
      this.state.messageArray[i].responseCardAttachments[j].buttons[
        k
      ].selectedClass = 'selected-button';
      this.state.messageArray[i].buttonsCls = 'disable-chatbot-button';

      // if file has been uploaded
      if (
        this.state.messageArray[i].images &&
        this.state.messageArray[i].images.length > 0 &&
        this.state.lastSlotName === 'uploadFile'
      ) {
        this.state.messageArray[i].isImage = false;
        this.setState({
          attachmentIconColor: ATTACHMENT_ICON_COLOR.DISABLE,
          enableAttachmentIcon: false,
        });
        let message = val;
        if (val === 'no') {
          // if user response is no
          let array = this.state.messageArray;
          array.push({
            message: '',
            reply: MESSAGES.rejectReportClaim,
            responseCardAttachments: [],
            messageTime: '',
            replyTime: new Date(),
            images: [],
            imageTime: '',
          });
          this.setState({
            showIdleSessionMessage: false,
            images: [],
            disableInput: false,
            messageArray: this.state.messageArray,
            placeholder: MESSAGES.placeholder,
            message: '',
            isButton: true,
            callLexFunc: true,
          });
          // scroll to the end of the conversation
          let scroll = this;
          setTimeout(function() {
            if (array && array.length > 0) {
              let len = array.length - 1;
              scroll.scrollDown('chatbot-reply-' + len);
            }
          }, 50);
        } else {
          // if user response is yes
          message = this.state.images.join();
          let array = this.state.messageArray;
          array.push({
            message: '',
            reply: this.inProgressMessage(message),
            responseCardAttachments: [],
            messageTime: '',
            replyTime: new Date(),
            images: [],
            imageTime: '',
          });
          this.setState({
            images: [],
            messageArray: this.state.messageArray,
            placeholder: MESSAGES.placeholder,
            message: '',
            isButton: true,
            callLexFunc: true,
          });
        }

        // call lex API
        let params = {
          botAlias: this.props.properties.botAlias,
          botName: this.props.properties.botName,
          inputText: message,
          userId: this.props.properties.userData.user_id
            ? this.props.properties.userData.user_id
            : lexUserId,
          sessionAttributes: this.state.sessionAttributes,
        };
        this.callLexPostAPI(params);
      } else {
        let array = this.state.messageArray;
        array.push({
          message: '',
          reply: this.inProgressMessage(val),
          responseCardAttachments: [],
          messageTime: '',
          replyTime: new Date(),
          images: [],
          imageTime: '',
        });

        this.setState({
          disableInput: true,
          messageArray: this.state.messageArray,
          placeholder: MESSAGES.placeholder,
          message: '',
          isButton: true,
          callLexFunc: true,
        });
        // scroll to the end of the conversation
        let scroll = this;
        setTimeout(function() {
          if (array && array.length > 0) {
            let len = array.length - 1;
            scroll.scrollDown('chatbot-reply-' + len);
          }
        }, 50);
        this.callLex(val); // call lex API
      }
    }
  }

  enableInput() {
    // enable input text
    this.setState({ disableInput: false });
    let focus = this;
    setTimeout(function() {
      focus.state.inputFocus.focus();
    }, 50);
  }

  callLex(buttonval) {
    //send it to the Lex runtime
    let message = this.state.message;
    if (buttonval) message = buttonval;
    let len = this.state.messageArray.length - 2;

    if (
      this.state.messageArray[len].reply.includes(
        MESSAGES.successfulPerchaseMessage
      ) &&
      this.state.intentName == 'CreditCardInformation' &&
      this.state.dialogState == 'Fulfilled'
    ) {
      if (message.toString().toLowerCase() === 'yes') {
        this.state.messageArray[this.state.messageArray.length - 1].reply =
          MESSAGES.updateTextMessage;
        this.state.messageArray[
          this.state.messageArray.length - 1
        ].responseCardAttachments = [
          {
            attachmentLinkUrl: null,
            buttons: [
              { text: 'Address', value: 'I want to update address' },
              { text: 'Phone', value: 'I want to update phone number' },
              { text: 'Add Credit Card', value: 'I want to add credit card' },
              {
                text: 'Remove Credit Card',
                value: 'I want to remove credit card',
              },
            ],
            imageUrl: null,
            subTitle: 'Click on any one option',
            title: 'Please select from the list below',
          },
        ];
        this.state.messageArray[
          this.state.messageArray.length - 1
        ].replyTime = new Date();
        this.setState({
          disableInput: true,
          messageArray: this.state.messageArray,
        });
        this.enableInput(); // enable input text
        // scroll to the end of the conversation
        this.scrollDown('chatbot-reply-' + length - 1);
      } else {
        this.state.messageArray[this.state.messageArray.length - 1].reply =
          MESSAGES.reject;
        this.setState({
          showIdleSessionMessage: false,
          messageArray: this.state.messageArray,
          placeholder: MESSAGES.placeholder,
          message: '',
          isButton: false,
          callLexFunc: true,
        });
        this.enableInput(); // enable input text
      }
    }
    // response after 5 minute of user inactivity
    else if (
      !buttonval &&
      this.state.messageArray[len].reply == this.state.before5minTimeOutMessage
    ) {
      if (message.toString().toLowerCase() === 'no') {
        // if user response no
        this.state.messageArray[len + 1].reply = MESSAGES.reject;
        this.setState({
          messageArray: this.state.messageArray,
          showIdleSessionMessage: false,
        });
        this.enableInput(); // enable input text
      } else {
        // if user response yes
        let length = this.state.messageArray.length;
        this.state.messageArray[length - 1].reply = this.state.messageArray[
          length - 3
        ].reply;
        this.state.messageArray[
          length - 1
        ].responseCardAttachments = this.state.messageArray[
          length - 3
        ].responseCardAttachments;
        this.state.messageArray[length - 1].replyTime = new Date();
        this.setState({
          messageArray: this.state.messageArray,
          idleSessionTime: 0,
        });
        this.enableInput(); // enable input text

        // scroll to the end of the conversation
        this.scrollDown('chatbot-reply-' + length - 1);
      }
    } else if (
      !buttonval &&
      this.state.messageArray[len].reply == MESSAGES.introduction
    ) {
      // response to introduction text
      if (this.state.message.toString().toLowerCase() == 'yes') {
        // if user response yes
        message = this.props.properties.isAgent
          ? MESSAGES.agentRequest
          : MESSAGES.userRequest;

        // call lex api
        let params = {
          botAlias: this.props.properties.botAlias,
          botName: this.props.properties.botName,
          inputText: message,
          userId: this.props.properties.userData.user_id
            ? this.props.properties.userData.user_id
            : lexUserId,
          sessionAttributes: this.state.sessionAttributes,
        };
        this.callLexPostAPI(params);
      } else {
        // if user response no
        this.state.messageArray[this.state.messageArray.length - 1].reply =
          MESSAGES.reject;
        this.setState({
          showIdleSessionMessage: false,
          messageArray: this.state.messageArray,
          placeholder: MESSAGES.placeholder,
          message: '',
          isButton: false,
          callLexFunc: true,
        });
        this.enableInput(); // enable input text
      }
    } else {
      let cvv = '',
        expiry = '',
        creditcardNumber = '',
        cardAction = '',
        headers = '';
      if (
        this.state.sessionAttributes &&
        this.state.sessionAttributes.currentData
      ) {
        if (JSON.parse(this.state.sessionAttributes.currentData).header) {
          headers = JSON.parse(this.state.sessionAttributes.currentData).header;
        }

        // get credit card details for buy flow
        if (
          JSON.parse(this.state.sessionAttributes.currentData).creditcardInfo
        ) {
          if (
            JSON.parse(this.state.sessionAttributes.currentData).creditcardInfo
              .cvv
          ) {
            cvv = JSON.parse(this.state.sessionAttributes.currentData)
              .creditcardInfo.cvv;
          }
          if (
            JSON.parse(this.state.sessionAttributes.currentData).creditcardInfo
              .expiry
          ) {
            /*Convert to mm/yyyy*/
            let myDate = new Date(
              JSON.parse(
                this.state.sessionAttributes.currentData
              ).creditcardInfo.expiry
            );
            let month = myDate.getMonth() + 1;
            let year = myDate.getFullYear();
            expiry = month + '/' + year;
          }
          if (
            JSON.parse(this.state.sessionAttributes.currentData).creditcardInfo
              .creditcardNumber
          ) {
            creditcardNumber = JSON.parse(
              this.state.sessionAttributes.currentData
            ).creditcardInfo.creditcardNumber;
          }
        }

        // get credit card details for profile flow
        if (
          JSON.parse(this.state.sessionAttributes.currentData)
            .addRemoveCreditCardInfo
        ) {
          if (
            JSON.parse(this.state.sessionAttributes.currentData)
              .addRemoveCreditCardInfo.cvv
          ) {
            cvv = JSON.parse(this.state.sessionAttributes.currentData)
              .addRemoveCreditCardInfo.cvv;
          }
          if (
            JSON.parse(this.state.sessionAttributes.currentData)
              .addRemoveCreditCardInfo.expiryDate
          ) {
            /*Convert to mm/yyyy*/
            let myDate = new Date(
              JSON.parse(
                this.state.sessionAttributes.currentData
              ).addRemoveCreditCardInfo.expiryDate
            );
            let month = myDate.getMonth() + 1;
            let year = myDate.getFullYear();
            expiry = month + '/' + year;
          }
          if (
            JSON.parse(this.state.sessionAttributes.currentData)
              .addRemoveCreditCardInfo.creditcardNumber
          ) {
            creditcardNumber = JSON.parse(
              this.state.sessionAttributes.currentData
            ).addRemoveCreditCardInfo.creditcardNumber;
          }
          if (
            JSON.parse(this.state.sessionAttributes.currentData)
              .addRemoveCreditCardInfo.cardAction
          ) {
            cardAction = JSON.parse(this.state.sessionAttributes.currentData)
              .addRemoveCreditCardInfo.cardAction;
          }
        }
      }

      // call nonce api
      if (
        this.props.brainTreeNonceVal === null &&
        this.state.creditCardSaved === false &&
        message.toString().toLowerCase() === 'yes' &&
        cvv &&
        expiry &&
        creditcardNumber &&
        ((this.state.lastSlotName == 'saveCard' &&
          this.state.intentName == 'CreditCardInformation' &&
          this.state.dialogState == 'ElicitSlot') ||
          (this.state.intentName == 'AddRemoveCreditCard' &&
            cardAction == 'add' &&
            this.state.dialogState == 'ConfirmIntent'))
      ) {
        let data = {
          header: headers,
          cvv: cvv,
          expiration_date: expiry,
          number: creditcardNumber,
        };
        this.setState({ saveCreditCardMsg: message, cardAction: cardAction });
        this.props.getBrainTreeNonce(data);
      } else {
        // call lex api
        let params = {
          botAlias: this.props.properties.botAlias,
          botName: this.props.properties.botName,
          inputText: message,
          userId: this.props.properties.userData.user_id
            ? this.props.properties.userData.user_id
            : lexUserId,
          sessionAttributes: this.state.sessionAttributes,
        };

        // if nonce is present
        if (
          this.props.brainTreeNonceVal &&
          this.props.brainTreeNonceVal !== null
        ) {
          if (params.inputText == '') {
            params.inputText = this.state.saveCreditCardMsg;
          }
          const sessionAttributesObject = Object.assign(
            {},
            params.sessionAttributes,
            {
              nonce: this.props.brainTreeNonceVal,
            }
          );
          params.sessionAttributes = sessionAttributesObject;
          this.setState({ creditCardSaved: true });
          this.callLexPostAPI(params);
        } else {
          this.callLexPostAPI(params);
        }
      }
    }
  }

  sendMessage(e) {
    // on submit user response
    if (e.keyCode === 13) {
      // check if pressed enter button
      if (this.state.message.trim()) {
        let array = this.state.messageArray;
        array.push({
          message: this.state.message,
          reply: this.inProgressMessage(this.state.message),
          responseCardAttachments: [],
          messageTime: new Date(),
          replyTime: '',
          images: [],
          imageTime: '',
        });
        this.setState({
          disableInput: true,
          messageArray: array,
          placeholder: MESSAGES.placeholder,
          message: '',
          isButton: false,
          callLexFunc: true,
        });

        // scroll to the end of the conversation
        let scroll = this;
        setTimeout(function() {
          if (array && array.length > 0) {
            let len = array.length - 1;
            scroll.scrollDown('chatbot-message-' + len);
          }
        }, 50);

        this.callLex(); // call Lex function
      } else {
        this.setState({ errorClass: 'chatbot-error' }); // input txt validation
      }
    }
  }

  onChangeMessage(val) {
    // on change message function
    this.setState({ message: val });
    if (this.state.message.trim()) {
      this.setState({ errorClass: '' });
    }
  }

  claimReport = event => {
    // claim report functionality
    if (this.state.enableAttachmentIcon === true) {
      // if file attachment is enabled
      let len = this.state.messageArray.length;
      let array = this.state.messageArray;
      array[len - 1].isImage = true;

      // scroll to the end of the conversation
      this.setState({ messageArray: array, validationFile: true });
      this.scrollDown('chatbot-loading-' + len - 1);

      // upload file to s3 bucket
      event.preventDefault();
      let fileArray = event.target.files;
      this.setState({ fileArray: fileArray });
      if (fileArray[0]) {
        this.uploadFile(fileArray[0]);
      } else {
        this.setState({ validationFile: false });
      }
    }
  };

  uploadFile = file => {
    // upload file to s3 bucket
    return new Promise((resolve, reject) => {
      const bucketName = this.props.properties.bucketName
        ? this.props.properties.bucketName
        : null;
      this.props.uploadFileRequest({ file, bucketName }, { resolve, reject });
    });
  };

  callLexPostAPI = payload => {
    // upload file to s3 bucket
    return new Promise((resolve, reject) => {
      this.props.postLexRunTime(payload, { resolve, reject });
    });
  };

  callBasicLexData = payload => {
    // upload file to s3 bucket
    return new Promise((resolve, reject) => {
      this.props.getBotData(payload, { resolve, reject });
    });
  };

  handleImageChange = () => {
    // display uploaded files
    let len = this.state.messageArray.length;
    let array = this.state.messageArray;
    array[len - 1].responseCardAttachments = [
      {
        attachmentLinkUrl: null,
        subTitle: 'Click on any one option',
        title: MESSAGES.attachFileText,
        buttons: [{ text: 'Yes', value: 'yes' }],
      },
    ];
    let imageArr = array[len - 1].images;
    imageArr.push({
      image: this.state.fileArray[0],
      imagePath: URL.createObjectURL(this.state.fileArray[0]),
      imageTime: new Date(),
    });
    array[len - 1].images = imageArr;
    array[len - 1].imageTime = new Date();
    this.setState({
      disableInput: true,
      messageArray: array,
      validationFile: false,
      fileArray: '',
    });

    // scroll to the end of the conversation
    let scroll = this;
    setTimeout(function() {
      if (array && array.length > 0) {
        let len = array.length - 1;
        let imgLen = imageArr.length - 1;
        scroll.scrollDown('chatbot-image-' + len + '-' + imgLen);
      }
    }, 50);
  };

  clearFile = (i, l) => {
    // clear uploaded file
    let images = this.state.images;
    images.splice(l, 1);
    this.state.messageArray[i].images.splice(l, 1);
    if (this.state.messageArray[i].images.length == 0)
      this.state.messageArray[i].responseCardAttachments = [];
    this.setState({ images: images, messageArray: this.state.messageArray });
  };

  render() {
    return (
      <div className="chatbot-container" style={this.props.properties.style}>
        <div className="chatbot-header">
          <h3>
            {this.props.properties.title
              ? this.props.properties.title
              : 'Intelligent Chatbot'}
          </h3>
          <div className="chatbot-header-icons">
            <div className="file-attachment">
              {this.state.enableAttachmentIcon === true && (
                <input
                  className="fileInput"
                  type="file"
                  name="file1"
                  onChange={this.claimReport}
                />
              )}
              <svg
                height="30"
                viewBox="10 10 30 30"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill={this.state.attachmentIconColor}
                  d="M33 12v23c0 4.42-3.58 8-8 8s-8-3.58-8-8v-25c0-2.76 2.24-5 5-5s5 2.24 5 5v21c0 1.1-.89 2-2 2-1.11 0-2-.9-2-2v-19h-3v19c0 2.76 2.24 5 5 5s5-2.24 5-5v-21c0-4.42-3.58-8-8-8s-8 3.58-8 8v25c0 6.08 4.93 11 11 11s11-4.92 11-11v-23h-3z"
                />
                <path d="M0 0h48v48h-48z" fill="none" />
              </svg>
            </div>
            <span
              className="chatbot-clear-btn"
              onClick={() => this.clearChat()}
            >
              Clear history
            </span>
            <span
              onClick={() => this.props.closeChatBox(this.state.messageArray)}
            >
              {' '}
              X{' '}
            </span>
          </div>
        </div>
        <Body
          chatboxHeight={this.props.properties.style}
          messageArray={this.state.messageArray}
          clickButton={(val, i, j, k) => this.clickButton(val, i, j, k)}
          clearChat={() => this.clearChat()}
          clearFile={(i, l) => this.clearFile(i, l)}
          validationFile={this.state.validationFile}
        />
        <div className={`chatbot-input-div ${this.state.errorClass}`}>
          <input
            ref={input => {
              this.state.inputFocus = input;
            }}
            disabled={this.state.disableInput}
            id="input"
            placeholder={this.state.placeholder}
            value={this.state.message}
            onChange={e => this.onChangeMessage(e.target.value)}
            onKeyDown={e => (window.onkeydown = this.sendMessage(e))}
          />
        </div>
      </div>
    );
  }
}
