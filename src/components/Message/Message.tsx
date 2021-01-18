import { Component } from "react";
import "./Message.scss"

interface MessageProps {
  wsMsgData: string;
  clientId: number;
  editUsername: any;
}
interface MessageState {
  message: ChatMessage;
  isEditingUsername: boolean;
}
interface ChatMessage {
  body: string;
  fromClientId: number;
  username: string;
}

class Message extends Component<MessageProps, MessageState> {
  constructor(props: any) {
    super(props);
    let message: ChatMessage = (({ body, fromClientId, username }) => ({ body, fromClientId, username }))(JSON.parse(this.props.wsMsgData));
    this.state = {
      message: message,
      isEditingUsername: false,
    }
  }

  componentWillReceiveProps(nextProps: MessageProps) {
    this.setState({ message: (({ body, fromClientId, username }) => ({ body, fromClientId, username }))(JSON.parse(nextProps.wsMsgData))})
  }

  editUsername = () => {
    this.setState({isEditingUsername: true});
  }

  saveUsername = (event: any) => {
    this.props.editUsername(event.target.value);
    this.setState({ isEditingUsername: false });
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
    let username = "User " + this.state.message.fromClientId;
    if (this.state.message.username) {
      username = this.state.message.username;
    }
    return (
      <div className={`Message ${messageType}`} onClick={this.editUsername}>
        {messageType !== "system" &&
          (this.state.isEditingUsername && messageType === 'me'
            ? <span className="username">
                <input autoFocus
                  defaultValue={username}
                  onBlur={this.saveUsername}
                  onKeyDown={this.handleKeyDown}
                />
              </span>
            : <span className="username">{username}</span>
          )
        }
        <span className="text-body">{this.state.message.body}</span>
      </div>
    )
  }
}

export default Message;
