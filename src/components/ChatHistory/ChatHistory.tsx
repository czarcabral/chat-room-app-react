import { Component } from "react";
import { WSMsg } from "../../common/types";
import Message from "../Message/Message";

import "./ChatHistory.scss";

interface ChatHistoryProps {
  chatHistory: WSMsg[];
  clientId: number;
  editUsername: any;
}

class ChatHistory extends Component<ChatHistoryProps> {
  render() {
    const messages = this.props.chatHistory.map((wsMsg: WSMsg, index: number) => (
      <Message key={index} wsMsgData={wsMsg.data} clientId={this.props.clientId} editUsername={this.props.editUsername} />
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
