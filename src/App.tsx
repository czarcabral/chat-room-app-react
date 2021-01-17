import React, { Component } from "react";
import './App.css';
import { connect, sendMsg } from "./api";
import Header from './components/Header/Header';
import ChatHistory from "./components/ChatHistory/ChatHistory";

interface AppProps {
}
interface AppState {
  chatHistory: any;
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
    connect((msg: string) => {
      console.log("New Message");

      // when message is received from server, change App state to append msg to end of chatHistory
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg],
      }))
      console.log(this.state);
    })
  }

  send = () => {
    console.log("hello");
    sendMsg("hello");
  }

  render() {
    return (
      <div className="App">
        <Header />
        <ChatHistory chatHistory={this.state.chatHistory} />
        <button onClick={this.send}>Hit</button>
      </div>
    );
  }
}

export default App;
