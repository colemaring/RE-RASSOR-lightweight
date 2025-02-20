import React, { createContext, useState, useEffect } from "react";

export const WebSocketsContext = createContext(null);

export const WebSocketsProvider = ({ children }) => {
  const [connected, setConnected] = useState(null);
  const [ws, setWs] = useState(null);
  const [clients, setClients] = useState([]);
  const [secrets, setSecrets] = useState({});

  // Retrieve the persisted connected value on page load
  useEffect(() => {
    const savedConnected = localStorage.getItem("roverName");
    if (savedConnected) {
      setConnected(savedConnected);
    }
  }, []);

  // Persist the connected value to localStorage whenever it changes
  useEffect(() => {
    if (connected) {
      localStorage.setItem("roverName", connected);
    }
  }, [connected]);

  // Create a single websocket instance based on "connected" state.
  useEffect(() => {
    const wsUrl = connected
      ? `wss://rerassor.com/?name=${encodeURIComponent(
          connected
        )}&clientType=browser`
      : "wss://rerassor.com";
    const wsInstance = new WebSocket(wsUrl);
    setWs(wsInstance);

    // Clean up: close the connection when the effect is re-run or unmounted.
    return () => {
      wsInstance.close();
    };
  }, [connected]);

  // Handle updates for connected clients and secrets
  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "connectedClients") {
          setClients(data.clients || []);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    const handleError = (event) => {
      if (
        ws.readyState === WebSocket.CLOSING ||
        ws.readyState === WebSocket.CLOSED
      ) {
        return;
      }
      console.error("WebSocket error:", event);
    };

    ws.addEventListener("message", handleMessage);
    ws.addEventListener("error", handleError);

    const intervalId = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: "getConnectedClients" }));
      }
    }, 1000);

    return () => {
      ws.removeEventListener("message", handleMessage);
      ws.removeEventListener("error", handleError);
      clearInterval(intervalId);
    };
  }, [ws]);

  // Clear connected if the current rover is no longer in clients
  useEffect(() => {
    if (connected && !clients.some((client) => client.name === connected)) {
      setConnected(null);
    }
  }, [clients, connected]);

  // On mount (or when clients update), check localStorage and pre-fill secrets
  useEffect(() => {
    const storedRoverName = localStorage.getItem("roverName");
    if (storedRoverName && clients.length > 0) {
      const roverToConnect = clients.find(
        (client) => client.name === storedRoverName
      );
      if (roverToConnect) {
        setConnected(roverToConnect.name);
        setSecrets((prevSecrets) => ({
          ...prevSecrets,
          [roverToConnect.name]: roverToConnect.secret || "",
        }));
      }
    }
  }, [clients, setConnected]);

  return (
    <WebSocketsContext.Provider
      value={{ connected, setConnected, ws, clients, secrets, setSecrets }}
    >
      {children}
    </WebSocketsContext.Provider>
  );
};
