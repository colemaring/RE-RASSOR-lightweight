import "./App.css";
import Controller from "./components/Controller";
import Status from "./components/Status";
import ConnectedClients from "./components/ConnectedClients";
import { useState } from "react";

function App() {
  const [connected, setConnected] = useState(null);
  // Establish WebSocket connection
  const wsUrl = "ws://localhost:80";
  const ws = new WebSocket(wsUrl);

  return (
    <>
      <ConnectedClients
        setConnected={setConnected}
        connected={connected}
        ws={ws}
      />
      <Status connected={connected} />
      <Controller connected={connected} ws={ws} />
    </>
  );
}

export default App;
