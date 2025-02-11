import "./App.css";
import Controller from "./components/Controller";
import Status from "./components/Status";
import ConnectedClients from "./components/ConnectedClients";
import { useState } from "react";
import SpeedSlider from "./components/SpeedSlider";
import MyNavbar from "./components/MyNavbar";
import IMUData from "./components/IMUData";

function App() {
  const [connected, setConnected] = useState(null);

  // Establish WebSocket connection
  const wsUrl = "ws://localhost:8080";
  const ws = new WebSocket(wsUrl);

  return (
    <>
      <MyNavbar></MyNavbar>
      <ConnectedClients
        setConnected={setConnected}
        connected={connected}
        ws={ws}
      />
      <Status connected={connected} />
      <SpeedSlider connected={connected} ws={ws} />
      <Controller connected={connected} ws={ws} />
      <IMUData connected={connected} ws={ws} />
    </>
  );
}

export default App;
