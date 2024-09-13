// for testing server and frontend development
// run with node testclient.js

const WebSocket = require("ws");

const ws = new WebSocket("ws://161.35.13.104:8080?name=superman");

ws.on("open", () => {
  console.log("Connected to the WebSocket server");
  ws.send(JSON.stringify({ type: "getConnectedClients" }));
});

ws.on("message", (message) => {
  console.log(`Received message from server: ${message}`);
});
