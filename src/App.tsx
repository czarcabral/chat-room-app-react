import React, { Component } from "react";
import './App.css';
import { connect, sendMsg } from "./api";
import Header from './components/Header/Header';
import ChatHistory from "./components/ChatHistory/ChatHistory";
import { HttpMessage, WSMsg } from "./common/types";
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
      sendMsg(event.target.value);
      event.target.value="";
    }
  }

  editUsername = (newUsername: string) => {
    // const chatHistoryCopy: WSMsg[] = [];
    // for (const httpMessage of this.state.chatHistory) {
    //   const data = JSON.parse(htt.data);
    //   // if (data.fromClientId === this.state.clientId) {
    //   //   data.username = newUsername;
    //   // }
    //   const newWsMsg: WSMsg = { data: JSON.stringify(data) };
    //   chatHistoryCopy.push(newWsMsg);
    // }
    // this.setState({chatHistory: [...chatHistoryCopy]}, () => {});
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
