import "./App.css";
import Controller from "./components/Controller";
import Status from "./components/Status";
import ConnectedClients from "./components/ConnectedClients";
import { useState } from "react";
import SpeedSlider from "./components/SpeedSlider";

function App() {
  const [connected, setConnected] = useState(null);
  // Establish WebSocket connection
  const wsUrl = "ws://161.35.13.104:8080";
  const ws = new WebSocket(wsUrl);

  return (
    <>
      <ConnectedClients
        setConnected={setConnected}
        connected={connected}
        ws={ws}
      />
      <Status connected={connected} />
      <SpeedSlider connected={connected} ws={ws} />
      <Controller connected={connected} ws={ws} />
    </>
  );
}

export default App;
