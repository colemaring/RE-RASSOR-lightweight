import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

const ConnectedClients = ({ setConnected, connected, ws }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Send a message to the WebSocket server to retrieve the current list of connected rovers
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "getConnectedClients" }));
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "connectedClients") {
        setClients(data.clients);
        console.log(`Connected clients: ${data.clients}`);
      }
    };

    // Handle connection error
    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
    };
  }, []);

  useEffect(() => {
    if (!clients.includes(connected)) {
      setConnected(null);
    }
  }, [clients, connected]);

  const handleConnect = (client) => {
    console.log(`Connecting to ${client}`);
    setConnected(client);
  };

  return (
    <div className="table-container">
      <h1>Online Rovers:</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rover</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client}</td>
              <td>
                <Button
                  variant="primary"
                  disabled={connected != null}
                  onClick={() => handleConnect(client)}
                >
                  Connect
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ConnectedClients;
