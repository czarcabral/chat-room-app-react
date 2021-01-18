import { Component } from "react";
import "./Message.scss"

interface MessageProps {
  wsMsgData: string;
  clientId: number;
}
interface MessageState {
  message: ChatMessage;
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
    this.state = {
      message: message
    }
  }

  render() {
    const isMyMessage = this.props.clientId === this.state.message.fromClientId;
    const isSystemMessage = this.state.message.fromClientId === 0;
    return (
      <div className={` Message ${isMyMessage ? "me" : (isSystemMessage ? "system" : "you")}`}>
        {isSystemMessage ? `` : `User ${this.state.message.fromClientId}: `}{this.state.message.body}
      </div>
    )
  }
}

export default Message;
