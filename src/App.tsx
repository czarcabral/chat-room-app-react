import React, { Component } from "react";
import './App.css';
import { connect, sendMsg } from "./api";
import Header from './components/Header/Header';
import ChatHistory from "./components/ChatHistory/ChatHistory";
import { HttpMessage, WSMsg, MyOutgoingMessage, ChatEventType } from "./common/types";
import ChatInput from "./components/ChatInput/ChatInput";

interface AppProps {
}
interface AppState {
  chatHistory: HttpMessage[];
}

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      chatHistory: [],
    }
  }

  // when component mounts, open socket connection to server
  componentDidMount() {

    // pass callback function to our connect function
    connect((wsMsg: WSMsg) => {
      // extract httpMessage from wsMessage
      let httpMessage = JSON.parse(wsMsg.data);

      // when message is received from server, change App state to append wsMsg to end of chatHistory
      this.setState(_ => ({
        chatHistory: [...this.state.chatHistory, httpMessage], // makes a copy of current Chat History and adds new wsMsg to end
      }))
    })
  }

  send = (event: any) => {
    if (event.keyCode === 13) {
      const outgoingMessage: MyOutgoingMessage = {
        chatEventType: ChatEventType.Default,
        value: event.target.value,
      }
      sendMsg(outgoingMessage);
      event.target.value="";
    }
  }

  editUsername = (newUsername: string) => {
    // const chatHistoryCopy = [...this.state.chatHistory];
    // for (const httpMessage of chatHistoryCopy) {
    //   const chatMessage = httpMessage.body;
    //   if (chatMessage.isOwner) {
    //     chatMessage.username = newUsername;
    //   }
    // }
    // // this.setState({chatHistory: [...chatHistoryCopy]}, () => {});
    // this.setState({chatHistory: chatHistoryCopy}, () => {});
    const outgoingMessage: MyOutgoingMessage = {
      chatEventType: ChatEventType.UsernameChange,
      newUsername: newUsername,
    }
    sendMsg(outgoingMessage);

  }

  render() {
    return (
      <div className="App">
        <Header />
        <ChatHistory chatHistory={this.state.chatHistory} editUsername={this.editUsername} />
        <ChatInput send={this.send} />
      </div>
    );
  }
}

export default App;
