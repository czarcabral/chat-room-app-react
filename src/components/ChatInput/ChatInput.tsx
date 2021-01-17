import { Component } from "react";

interface ChatInputProps {
  send: any;
}

class ChatInput extends Component<ChatInputProps> {
  render() {
    return (
      <div className="ChatInput">
        <input onKeyDown={this.props.send} />
      </div>
    )
  }
}

export default ChatInput;
