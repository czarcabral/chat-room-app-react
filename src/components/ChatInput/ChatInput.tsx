import { Component } from "react";

import "./ChatInput.scss";

interface ChatInputProps {
  send: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
