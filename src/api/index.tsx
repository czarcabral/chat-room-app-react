import { WSMsg } from "../common/types";

// this is a 2 way connection to backend
let socket = new WebSocket("wss://chat-room-app-go.herokuapp.com/ws");

// this is to receive messages from backend
export var connect = (cb: Function) => {
  console.log("Attempting Connection...");

  // when the connection between client and server via socket starts
  socket.onopen = () => {
    console.log("Successfully Connected");
  }

  // when this client receives a message from the server
  socket.onmessage = (wsMsg: WSMsg) => {
    console.log(wsMsg);
    cb(wsMsg);
  }

  // when the connection closes
  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
  }

  // when any errors occur
  socket.onerror = error => {
    console.log("Socket Error: ", error);
  }
}

// this is to send messages to backend
// note socket.send() must take in string as parameter
let sendMsg = (msg: any) => {
  console.log("sending msg: ", msg);
  socket.send(JSON.stringify(msg));
}

export { sendMsg }
