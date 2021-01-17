import { Component } from "react";
import { Msg } from "../../common/types";

interface ChatHistoryProps {
  chatHistory: Msg[];
}

class ChatHistory extends Component<ChatHistoryProps> {
  render() {
    const messages = this.props.chatHistory.map((msg: Msg, index: number) => (
      <p key={index}>{msg.data}</p>
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
