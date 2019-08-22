import React, { Component } from 'react';
import createStore from '../store';
import reducer from '../reducer';
import saga from '../sagas';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { fork } from 'redux-saga/effects';
import Container from './component/Container';
import { MESSAGES } from '../constants';

export default class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageArray: [],
    };
  }

  // close chat box
  closeChatBox(messageArray) {
    this.setState({ messageArray: messageArray });
    this.props.closeChatBox();
  }

  render() {
    const reducers = { lex: reducer };
    const sagas = [fork(saga)];
    const history = createHistory();
    if (this.state.messageArray.length == 0) {
      this.state.messageArray = [
        {
          message: '',
          reply: MESSAGES.introduction,
          responseCardAttachments: [],
          messageTime: '',
          replyTime: new Date(),
          isImage: false,
          images: [],
          imageTime: '',
        },
      ];
    }

    return (
      <div>
        {this.props.showChatbot === true && (
          <Provider store={createStore(reducers, sagas, history)}>
            <Container
              properties={this.props}
              messageArray={this.state.messageArray}
              closeChatBox={messageArray => this.closeChatBox(messageArray)}
            />
          </Provider>
        )}
      </div>
    );
  }
}
