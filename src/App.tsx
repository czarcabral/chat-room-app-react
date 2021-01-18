import React, { Component } from "react";
import './App.css';
import { connect, sendMsg } from "./api";
import Header from './components/Header/Header';
import ChatHistory from "./components/ChatHistory/ChatHistory";
import { WSMsg } from "./common/types";
import ChatInput from "./components/ChatInput/ChatInput";

interface AppProps {
}
interface AppState {
  chatHistory: WSMsg[];
  clientId: number;
}

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      chatHistory: [],
      clientId: 0,
    }
    // this.send = this.send.bind(this);
  }

  // when component mounts, open socket connection to server
  componentDidMount() {
    console.log(this.state);

    // pass callback function to our connect function
    connect((wsMsg: WSMsg) => {
      let msg = JSON.parse(wsMsg.data);

      // if message is about registering a new user, assign this app's (client's) id
      if (msg.newClientId > 0) {
        this.setState({ clientId: msg.newClientId })
      }

      // when message is received from server, change App state to append wsMsg to end of chatHistory
      this.setState(_ => ({
        chatHistory: [...this.state.chatHistory, wsMsg], // makes a copy of current Chat History and adds new wsMsg to end
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
        <ChatHistory chatHistory={this.state.chatHistory} clientId={this.state.clientId} />
        <ChatInput send={this.send} />
      </div>
    );
  }
}

export default App;
