import React, { Component } from "react";
import './App.css';
import { connect, sendMsg } from "./api";
import Header from './components/Header/Header';
import ChatHistory from "./components/ChatHistory/ChatHistory";
import { Msg } from "./common/types";
import ChatInput from "./components/ChatInput/ChatInput";

interface AppProps {
}
interface AppState {
  chatHistory: Msg[];
}

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      chatHistory: [],
    }
    // this.send = this.send.bind(this);
  }

  // when component mounts, open socket connection to server
  componentDidMount() {
    console.log(this.state);

    // pass callback function to our connect function
    connect((msg: Msg) => {
      console.log("New Message");

      // when message is received from server, change App state to append msg to end of chatHistory
      this.setState(_ => ({
        chatHistory: [...this.state.chatHistory, msg],
      }))
      console.log(this.state);
    })
  }

  send = (event: any) => {
    if (event.keyCode === 13) {
      sendMsg(event.target.value);
      event.target.value="";
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <ChatHistory chatHistory={this.state.chatHistory} />
        <ChatInput send={this.send} />
      </div>
    );
  }
}

export default App;
