import { Component } from "react";
import { ChatMessage } from "../../common/types";
import "./Message.scss"

interface MessageProps {
  chatMessage: ChatMessage;
  editUsername: any;
}
interface MessageState {
  isEditingUsername: boolean;
}

class Message extends Component<MessageProps, MessageState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isEditingUsername: false,
    }
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
    if (this.props.chatMessage.username && this.props.chatMessage.isOwner) {
      messageType = "me";
    } else if (this.props.chatMessage.username) {
      messageType = "you";
    } else {
      messageType = "system";
    }
    return (
      <div className={`Message ${messageType}`} onClick={this.editUsername}>
        {messageType !== "system" &&
          (this.state.isEditingUsername && messageType === 'me'
            ? <span className="username">
                <input autoFocus
                  defaultValue={this.props.chatMessage.username}
                  onBlur={this.saveUsername}
                  onKeyDown={this.handleKeyDown}
                />
              </span>
            : <span className="username">{this.props.chatMessage.username}</span>
          )
        }
        <span className="text-body">{this.props.chatMessage.message}</span>
      </div>
    )
  }
}

export default Message;
