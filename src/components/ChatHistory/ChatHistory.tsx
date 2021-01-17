import { Component } from "react";

interface ChatHistoryProps {
  chatHistory: any;
}

class ChatHistory extends Component<ChatHistoryProps> {
  render() {
    const messages = this.props.chatHistory.map((msg: any, index: number) => (
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
