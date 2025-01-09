const express = require("express");
const app = express();
const https = require("https");
const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");
const path = require("path");
Stream = require("node-rtsp-stream");

const isDev = process.env.NODE_ENV === "dev";
const SSLkey = process.env.SSL_KEY;
const SSLcert = process.env.SSL_CERT;
const SSLkeypath = process.env.SSL_KEYPATH;
const SSLcertpath = process.env.SSL_CERTPATH;
let httpsServer, httpServer, options;

if (!isDev) {
  // production server with ssl and http redirect test

  // droplet server
  if (SSLcertpath) {
    options = {
      key: fs.readFileSync(SSLkeypath),
      cert: fs.readFileSync(SSLcertpath),
    };
  }
  // docker
  else {
    options = {
      key: SSLkey,
      cert: SSLcert,
    };
  }

  httpsServer = https.createServer(options, app);

  // Create an HTTP server to redirect to HTTPS
  httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  });

  httpsServer.listen(443, () => {
    console.log("Server started on port 443");
  });

  httpServer.listen(80, () => {
    console.log("HTTP redirect server started on port 80");
  });
} else {
  // dev server
  httpServer = http.createServer(app);

  httpServer.listen(8080, () => {
    console.log("Development server started on port 8080");
  });
}

// RTSP stream handler
stream = new Stream({
  name: "name",
  streamUrl: "rtsp://admin:123456@108.188.73.13:1081/stream1",
  wsPort: 9999,
  ffmpegOptions: {
    // options ffmpeg flags
    "-stats": "", // an option with no neccessary value uses a blank string
    "-r": 30, // options with required values specify the value after the key
  },
});

app.use(express.static("../client/dist"));

// For all routes, return index.html from the dist folder
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// websocket server
let wss = null;
if (!isDev) wss = new WebSocket.Server({ port: 8080 });
else wss = new WebSocket.Server({ noServer: true });
//try 443?

let connectedClients = [];

// When a connection to a a client is established
wss.on("connection", (ws, req) => {
  const query = req.url.split("?")[1];
  const params = new URLSearchParams(query);
  const name = params.get("name");
  const secret = params.get("secret");

  // Store the client name and secret
  ws.clientName = name;
  ws.clientSecret = secret;

  // null name is broswer client, which shouldnt be added to list
  if (name != null || name == "") {
    if (!connectedClients.some((client) => client.name === name)) {
      connectedClients.push({ name, secret });
    }
    console.log(`Client connected: ${name}`);
  }

  // Set up ping interval
  const pingIntervalId = setInterval(() => {
    ws.ping();
    ws.pingTimeoutId = setTimeout(() => {
      if (
        ws.readyState === WebSocket.OPEN &&
        connectedClients.some((client) => client.name === ws.clientName)
      ) {
        // Client didn't respond to ping, remove from connected clients and terminate connection
        connectedClients = connectedClients.filter(
          (client) => client.name !== ws.clientName
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
        JSON.stringify({
          type: "connectedClients",
          clients: connectedClients,
        })
      );
    }
  });

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.type === "getConnectedClients") {
      // Send the current list of connected rovers to the client
      ws.send(
        JSON.stringify({
          type: "connectedClients",
          clients: connectedClients,
        })
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
    connectedClients = connectedClients.filter(
      (client) => client.name !== ws.clientName
    );
    console.log(`Client disconnected: ${name}`);
    console.log(
      `Connected clients: ${connectedClients.map((client) => client.name)}`
    );

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
    connectedClients = connectedClients.filter(
      (client) => client.name !== ws.clientName
    );
    console.log(
      `Connected clients: ${connectedClients.map((client) => client.name)}`
    );

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
if (!isDev) {
  httpsServer.on("upgrade", (request, socket, head) => {
    // Forward the upgrade request to the WebSocket server on port 8080 test
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });
}
