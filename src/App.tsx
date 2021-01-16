import React, { Component } from "react";
import './App.css';
import { connect, sendMsg } from "./api";
import Header from './components/Header/Header';
import ChatHistory from "./components/ChatHistory";

interface AppProps {
}
interface AppState {
  chatHistory: any;
  mynum: number;
}

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      chatHistory: [],
      mynum: 1,
    }
    // this.send = this.send.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
    connect((msg: string) => {
      console.log("New Message");
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg],
        mynum: this.state.mynum + 1,
      }))
      console.log(this.state);
    })
  }

  // send() {
  //   console.log("hello", this.state.mynum);
  //   sendMsg("hello" + this.state.mynum);
  // }

  send = () => {
    console.log("hello", this.state.mynum);
    sendMsg("hello" + this.state.mynum);
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
