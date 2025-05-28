const express = require("express");
const app = express();
const https = require("https");
const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");
const path = require("path");
Stream = require("node-rtsp-stream");

// Optional params for ssl on production
const isDev = process.env.NODE_ENV === "dev";
const SSLkey = process.env.SSL_KEY;
const SSLcert = process.env.SSL_CERT;
const SSLkeypath = process.env.SSL_KEYPATH;
const SSLcertpath = process.env.SSL_CERTPATH;
// const rtsp_url_bin = process.env.RTSP_URL_BIN; renew cert diff 

let httpsServer, httpServer, options;

if (!isDev) {
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
    "-loglevel": "quiet",
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

// Broadcast connected clients to browsers (null clientNames)
// Called frequently to keep browsers updated
function broadcastConnectedClientsToBrowsers(wss, ws) {
  wss.clients.forEach((client) => {
    if (
      !client.clientName &&
      client !== ws &&
      client.readyState === WebSocket.OPEN
    ) {
      client.send(
        JSON.stringify({
          type: "connectedClients",
          clients: connectedClients,
        })
      );
    }
  });
}

// When a connection to a a client is established
wss.on("connection", (ws, req) => {
  const query = req.url.split("?")[1];
  const params = new URLSearchParams(query);
  const name = params.get("name");
  const secret = params.get("secret");
  const clientType = params.get("clientType");

  // Store the client name and secret
  ws.clientName = name;
  ws.clientSecret = secret;
  ws.clientType = clientType;

  // Log the connection
  if (name == null) {
    console.log("Browser listening for connected clients");
  } else if (clientType == null) {
    console.log(`rover connected: ${name}`);
  } else if (clientType === "browser") {
    console.log(`browser connected to: ${name}`);
  }

  // null name is broswer client, which shouldnt be added to list
  if (name != null) {
    if (!connectedClients.some((client) => client.name === name)) {
      connectedClients.push({ name, secret });
    }
  }

  broadcastConnectedClientsToBrowsers(wss, ws);

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
          if (
            client.clientName === ws.clientName &&
            client.clientType !== "browser"
          ) {
            client.terminate();
          }
        });

        broadcastConnectedClientsToBrowsers(wss, ws);
        clearInterval(pingIntervalId); // Stop the ping interval
      }
    }, 5000);
  }, 5000);

  // Handle pong response
  ws.on("pong", () => {
    clearTimeout(ws.pingTimeoutId);
  });

  // Handle incoming messages
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
    } else if (data.type === "move") {
      // Relay the move message to the connected client whose name matches the rover name
      const roverName = data.rover;
      wss.clients.forEach((client) => {
        if (
          client.readyState === WebSocket.OPEN &&
          client.clientName === roverName
        ) {
          client.send(
            JSON.stringify({ type: "move", direction: data.direction })
          );
        }
      });
    } else if (data.type === "speed") {
      // Relay the speed message to the connected client whose name matches the rover name
      const roverName = data.rover;
      wss.clients.forEach((client) => {
        if (
          client.readyState === WebSocket.OPEN &&
          client.clientName === roverName
        ) {
          client.send(JSON.stringify({ type: "speed", speed: data.speed }));
        }
      });
    } else if (data.type === "IMU") {
      // Parse the URL to extract the name parameter
      let clientNameFromUrl = null;
      if (data.url) {
        const parts = data.url.split("?");
        if (parts.length > 1) {
          const params = new URLSearchParams(parts[1]);
          clientNameFromUrl = params.get("name");
        }
      }
      // Relay the IMU message to the browser client whose name matches clientNameFromUrl
      wss.clients.forEach((client) => {
        if (
          client !== ws &&
          client.readyState === WebSocket.OPEN &&
          client.clientType === "browser" &&
          client.clientName === clientNameFromUrl
        ) {
          client.send(
            JSON.stringify({
              type: "IMU",
              name: clientNameFromUrl,
              yaw: data.yaw,
              pitch: data.pitch,
              roll: data.roll,
            })
          );
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
      if (
        client.clientName === ws.clientName &&
        client !== ws &&
        client.clientType !== "browser"
      ) {
        client.terminate();
      }
    });

    broadcastConnectedClientsToBrowsers(wss, ws);
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

    broadcastConnectedClientsToBrowsers(wss, ws);
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
