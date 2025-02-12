import React, { createContext, useState, useEffect } from "react";

export const WebSocketsContext = createContext(null);

export const WebSocketsProvider = ({ children }) => {
  const [connected, setConnected] = useState(null);
  const [ws, setWs] = useState(null);

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
    // Use the query param connection when connected if it
    // otherwise get new list of connected clients
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

  return (
    <WebSocketsContext.Provider value={{ connected, setConnected, ws }}>
      {children}
    </WebSocketsContext.Provider>
  );
};
