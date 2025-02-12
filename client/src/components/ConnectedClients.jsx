import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

const ConnectedClients = ({ setConnected, connected, ws }) => {
  const [clients, setClients] = useState([]);
  const [secrets, setSecrets] = useState({});

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "connectedClients") {
        setClients(data.clients || []);
      }
    };

    const handleError = (event) => {
      console.error("WebSocket error:", event);
    };

    ws.addEventListener("message", handleMessage);
    ws.addEventListener("error", handleError);

    const intervalId = setInterval(() => {
      ws.send(JSON.stringify({ type: "getConnectedClients" }));
    }, 1000);

    return () => {
      ws.removeEventListener("message", handleMessage);
      ws.removeEventListener("error", handleError);
      clearInterval(intervalId);
    };
  }, [ws]);

  useEffect(() => {
    if (!clients.some((client) => client.name === connected)) {
      setConnected(null);
    }
  }, [clients, connected, setConnected]);

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
          [roverToConnect.name]: roverToConnect.secret || "", // Pre-fill secret if available
        }));
      }
    }
  }, [clients, setConnected]); // This useEffect runs when clients change or the component mounts

  const handleConnect = (client) => {
    if (connected === client.name) {
      console.log(`Disconnecting from ${client.name}`);
      setConnected(null);
      setSecrets({});
      localStorage.removeItem("roverName"); // Remove from localStorage on disconnect
    } else {
      console.log(`Connecting to ${client.name}`);
      setConnected(client.name);
      localStorage.setItem("roverName", client.name); // Store in localStorage
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
