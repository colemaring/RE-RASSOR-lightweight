import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

const ConnectedClients = ({ setConnected, connected, ws }) => {
  const [clients, setClients] = useState([]);
  const [secrets, setSecrets] = useState({});

  useEffect(() => {
    // Send a message to the WebSocket server to retrieve the current list of connected rovers
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "getConnectedClients" }));
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "connectedClients") {
        setClients(data.clients || []);
        // console.log(`Connected clients: ${data.clients}`);
      }
    };

    // Handle connection error
    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
    };
  }, [ws]);

  useEffect(() => {
    if (!clients.some((client) => client.name === connected)) {
      setConnected(null);
    }
  }, [clients, connected, setConnected]);

  const handleConnect = (client) => {
    if (connected === client.name) {
      console.log(`Disconnecting from ${client.name}`);
      setConnected(null);
      setSecrets({});
    } else {
      console.log(`Connecting to ${client.name}`);
      setConnected(client.name);
    }
  };

  const handleSecretChange = (clientName, value) => {
    setSecrets((prevSecrets) => ({
      ...prevSecrets,
      [clientName]: value,
    }));
  };

  return (
    <div className="table-container">
      <h1>Online Rovers:</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rover</th>
            <th>Secret</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.name}</td>
              <td>
                <Form.Control
                  type="password"
                  placeholder="Enter secret"
                  value={secrets[client.name] || ""}
                  onChange={(e) =>
                    handleSecretChange(client.name, e.target.value)
                  }
                />
              </td>
              <td>
                <Button
                  variant="primary"
                  disabled={secrets[client.name] !== client.secret}
                  onClick={() => handleConnect(client)}
                  className={connected === client.name ? "btn-danger" : ""}
                >
                  {connected === client.name ? "Disconnect" : "Connect"}
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
