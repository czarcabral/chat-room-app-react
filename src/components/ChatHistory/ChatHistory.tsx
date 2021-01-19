import { Component } from "react";
import { HttpMessage } from "../../common/types";
import Message from "../Message/Message";

import "./ChatHistory.scss";

interface ChatHistoryProps {
  chatHistory: HttpMessage[];
  editUsername: any;
}

class ChatHistory extends Component<ChatHistoryProps> {
  render() {
    const messages = this.props.chatHistory.map((httpMessage: HttpMessage, index: number) => (
      <Message key={index} chatMessage={httpMessage.body} editUsername={this.props.editUsername} />
    ));

    return (
      <div className="ChatHistory">
        <h2>Chat History</h2>
        {messages}
      </div>
    )
  }
}

export default ChatHistory;
