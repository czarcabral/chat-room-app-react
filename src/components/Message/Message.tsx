import { Component } from "react";
import "./Message.scss"

interface MessageProps {
  wsMsgData: string;
  clientId: number;
}
interface MessageState {
  message: ChatMessage;
  username: string;
  isEditingUsername: boolean;
}
interface ChatMessage {
  body: string;
  fromClientId: number;
}

class Message extends Component<MessageProps, MessageState> {
  constructor(props: any) {
    super(props);
    // let message: ChatMessage = JSON.parse(this.props.wsMsgData);
    let message = (({ body, fromClientId }) => ({ body, fromClientId }))(JSON.parse(this.props.wsMsgData));
    let username = "User " + message.fromClientId;
    this.state = {
      message: message,
      username: username,
      isEditingUsername: false,
    }
  }

  editUsername = () => {
    this.setState({isEditingUsername: true});
  }

  saveUsername = (event: any) => {
    this.setState({ username: event.target.value, isEditingUsername: false });
  }

  handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      this.saveUsername(event);
    }
  }

  render() {
    let messageType;
    switch (this.state.message.fromClientId) {
      case 0 :
        messageType = "system";
        break;
      case this.props.clientId :
        messageType = "me";
        break;
      default :
        messageType = "you";
    }
    return (
      <div className={`Message ${messageType}`} onClick={this.editUsername}>
        {messageType !== "system" &&
          (this.state.isEditingUsername && messageType === 'me'
            ? <span className="username">
                <input autoFocus
                  defaultValue={this.state.username}
                  onBlur={this.saveUsername}
                  onKeyDown={this.handleKeyDown}
                />
              </span>
            : <span className="username">{this.state.username}</span>
          )
        }
        <span className="text-body">{this.state.message.body}</span>
      </div>
    )
  }
}

export default Message;
