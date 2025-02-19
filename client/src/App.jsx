import "./App.css";
import Controller from "./components/Controller";
import Status from "./components/Status";
import ConnectedClients from "./components/ConnectedClients";
import { useEffect, useState, useContext } from "react";
import SpeedSlider from "./components/SpeedSlider";
import MyNavbar from "./components/MyNavbar";
import { WebSocketsContext } from "./context/WebSocketsContext";

function App() {
  const { connected, setConnected, ws, clients, secrets } =
    useContext(WebSocketsContext);

  return (
    <>
      <MyNavbar></MyNavbar>
      <ConnectedClients
        setConnected={setConnected}
        connected={connected}
        ws={ws}
        clients={clients}
        secrets={secrets}
      />
      <Status connected={connected} />
      <SpeedSlider connected={connected} ws={ws} />
      <Controller connected={connected} ws={ws} />
    </>
  );
}

export default App;
