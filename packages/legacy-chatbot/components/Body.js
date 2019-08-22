import { Component } from 'react';
import { timeSince } from '../libraries/time';

export default class ChatBotBody extends Component {
  render() {
    // set chatbot height
    let chatboxHeight = '';
    if (this.props.chatboxHeight && this.props.chatboxHeight.height) {
      chatboxHeight = 'calc(' + this.props.chatboxHeight.height + ' - 97px)';
    }
    return (
      <div>
        <div
          className="chatbot-chatbox"
          id="chatbot-chatbox"
          style={{ maxHeight: chatboxHeight }}
        >
          {this.props.messageArray.map((chat, i) => (
            <div key={i}>
              {chat.message && (
                <div className="chatbot-chat-div" id={`chatbot-message-${i}`}>
                  <div className="chatbot-message">{chat.message}</div>
                  {chat.messageTime && (
                    <div className="chatbot-message-time">
                      {timeSince(chat.messageTime)}
                    </div>
                  )}
                </div>
              )}
              {chat.reply && (
                <div className="chatbot-chat-div" id={`chatbot-reply-${i}`}>
                  <div
                    className={`chatbot-reply ${chat.errorMsg}`}
                    dangerouslySetInnerHTML={{ __html: chat.reply }}
                  ></div>
                  {chat.replyTime && (
                    <div className="chatbot-reply-time">
                      {timeSince(chat.replyTime)}
                    </div>
                  )}
                </div>
              )}
              {chat.images && chat.images.length > 0 ? (
                <div>
                  {chat.images.map((image, l) => (
                    <div key={i + l}>
                      {image.imagePath && (
                        <div
                          className="chat-image-attachment"
                          id={`chatbot-image-${i}-${l}`}
                        >
                          <span
                            className="chat-image-clear"
                            onClick={() => this.props.clearFile(i, l)}
                          >
                            X
                          </span>
                          <img className="chat-image" src={image.imagePath} />
                          {image.imageTime && (
                            <div className="chatbot-message-time">
                              {timeSince(image.imageTime)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {this.props.validationFile && chat.isImage && (
                    <div
                      className="chatbot-chat-div"
                      id={`chatbot-loading-${i}`}
                    >
                      <div className="chatbot-message">Loading file...</div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {this.props.validationFile && chat.isImage && (
                    <div
                      className="chatbot-chat-div"
                      id={`chatbot-loading-${i}`}
                    >
                      <div className="chatbot-message">Loading file...</div>
                    </div>
                  )}
                </div>
              )}
              {chat.responseCardAttachments &&
                chat.responseCardAttachments.length > 0 && (
                  <div className="chatbot-response-card">
                    {chat.responseCardAttachments.map((attachment, j) => (
                      <div key={i + j}>
                        <div className="chatbot-title">{attachment.title}</div>
                        {attachment.buttons &&
                          attachment.buttons.map((button, k) => (
                            <div key={i + j + k}>
                              {chat.buttonsCls ? (
                                <button
                                  className={`chatbot-button ${button.selectedClass} ${chat.buttonsCls}`}
                                >
                                  {button.text}
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    this.props.clickButton(
                                      button.value,
                                      i,
                                      j,
                                      k
                                    )
                                  }
                                  className={`chatbot-button ${button.selectedClass}`}
                                >
                                  {button.text}
                                </button>
                              )}
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
