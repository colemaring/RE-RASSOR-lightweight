const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:80?name=superman");

ws.on("open", () => {
  console.log("Connected to the WebSocket server");
  ws.send(JSON.stringify({ type: "getConnectedClients" }));
});

ws.on("message", (message) => {
  console.log(`Received message from server: ${message}`);
});
