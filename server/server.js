const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/rerassor.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/rerassor.com/fullchain.pem'),
};

const httpsServer = https.createServer(options, app);

// Create an HTTP server to redirect to HTTPS
const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { 'Location': `https://${req.headers.host}${req.url}` });
  res.end();
});

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

httpsServer.listen(443, () => {
  console.log('Server started on port 443');
});

httpServer.listen(80, () => {
  console.log('HTTP redirect server started on port 80');
});

const wss = new WebSocket.Server({ server: httpsServer });

let connectedClients = [];

// When a connection to a a client is established
wss.on("connection", (ws, req) => {
  const query = req.url.split("?")[1];
  const params = new URLSearchParams(query);
  const name = params.get("name");

  // Store the client name
  ws.clientName = name;

  // null name is broswer client, which shouldnt be added to list
  if (name != null || name == "") {
    if (!connectedClients.includes(name)) {
      connectedClients.push(name);
    }
  console.log(`Client connected: ${name}`);
}

  // Set up ping interval
const pingIntervalId = setInterval(() => {
  ws.ping();
  ws.pingTimeoutId = setTimeout(() => {
    if (
      ws.readyState === WebSocket.OPEN &&
      connectedClients.includes(ws.clientName)
    ) {
      // Client didn't respond to ping, remove from connected clients and terminate connection
      connectedClients = connectedClients.filter(
        (client) => client !== ws.clientName
      );
      console.log(`Client disconnected (unresponsive): ${ws.clientName}`);

      // Terminate all clients with the same name
      wss.clients.forEach((client) => {
        if (client.clientName === ws.clientName) {
          client.terminate();
        }
      });

      // Broadcast connected clients to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "connectedClients",
              clients: connectedClients,
            })
          );
        }
      });
      clearInterval(pingIntervalId); // Stop the ping interval
    }
  }, 5000);
}, 5000);

// Handle pong response
ws.on("pong", () => {
  clearTimeout(ws.pingTimeoutId);
});

  // Broadcast connected clients to all connected clients
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({ type: "connectedClients", clients: connectedClients })
      );
    }
  });

ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.type === "getConnectedClients") {
      // Send the current list of connected rovers to the client
      ws.send(
        JSON.stringify({ type: "connectedClients", clients: connectedClients })
      );
    }
    if (data.type === "move") {
      // Relay the move message to the connected client
      wss.clients.forEach((client) => {
        if (
          client !== ws &&
          client.readyState === WebSocket.OPEN &&
          client.clientName === ws.clientName
        ) {
          client.send(
            JSON.stringify({ type: "move", direction: data.direction })
          );
        }
      });
    } else if (data.type === "speed") {
      // Relay the move message to the connected client
      wss.clients.forEach((client) => {
        if (
          client !== ws &&
          client.readyState === WebSocket.OPEN &&
          client.clientName === ws.clientName
        ) {
          client.send(JSON.stringify({ type: "speed", speed: data.speed }));
        }
      });
    }
  });

  // send move message to appropriate rover client
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    const roverName = data.rover;
    if (data.type === "move") {
      // Relay the move message to the connected client where clientName matches roverName
      wss.clients.forEach((client) => {
        if (client.clientName === roverName) {
          client.send(
            JSON.stringify({ type: "move", direction: data.direction })
          );
        }
      });
    } else if (data.type === "speed") {
      // Relay the move message to the connected client where clientName matches roverName
      wss.clients.forEach((client) => {
        if (client.clientName === roverName) {
          client.send(JSON.stringify({ type: "speed", speed: data.speed }));
        }
      });
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    // Remove client name from the array
    connectedClients = connectedClients.filter((client) => client !== ws.clientName);
    console.log(`Client disconnected: ${name}`);
    console.log(`Connected clients: ${connectedClients}`);

     wss.clients.forEach((client) => {
    if (client.clientName === ws.clientName && client !== ws) {
      client.terminate();
    }
  });

    // Broadcast connected clients to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "connectedClients",
            clients: connectedClients,
          })
        );
      }
    });
  });


  // Handle client errors
  ws.on("error", (error) => {
    console.error("Client error:", error);
    // Remove client name from the array
    connectedClients = connectedClients.filter((client) => client !== ws.clientName);
    console.log(`Connected clients: ${connectedClients}`);

    // Broadcast connected clients to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "connectedClients",
            clients: connectedClients,
          })
        );
      }
    });
  });
});
