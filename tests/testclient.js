// for testing server and frontend development
// run with node testclient.js

const WebSocket = require("ws");

const ws = new WebSocket("wss://rerassor.com?name=superman12&secret=1234");

ws.on("open", () => {
  console.log("Connected to the WebSocket server");
  ws.send(JSON.stringify({ type: "getConnectedClients" }));
});

ws.on("message", (message) => {
  console.log(`Received message from server: ${message}`);
});
