// this is a 2 way connection to backend
let socket = new WebSocket("ws://localhost:8080/ws");

// this is to receive messages from backend
export var connect = (cb: Function) => {
  console.log("Attempting Connection...");
  socket.onopen = () => {
    console.log("Successfully Connected");
  }
  socket.onmessage = msg => {
    console.log(msg);
    cb(msg);
  }
  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
  }
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
