import { WSMsg } from "../common/types";

// this is a 2 way connection to backend
let socket = new WebSocket("ws://localhost:8080/ws");

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
let sendMsg = (msg: string) => {
  console.log("sending msg: ", msg);
  socket.send(msg);
}

export { sendMsg }
