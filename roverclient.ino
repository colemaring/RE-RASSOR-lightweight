#include <WiFi.h>
#include <WebSocketsClient.h>

const char* ssid = "Wokwi-GUEST";
const char* host = "ipv4ofdroplet";
const uint16_t port = 8080;
const char* url = "/?name=ddnise1";
const char* protocol = "ws";

WiFiClient client;
WebSocketsClient ws;

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Connect to WebSocket server
  ws.begin(host, port, url, protocol);
  ws.onEvent(onWsEvent);
}

void loop() {
  ws.loop();
}

void onWsEvent(WStype_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case WStype_CONNECTED:
      Serial.println("Connected to WebSocket server");
      ws.sendTXT("{\"type\":\"getConnectedClients\"}");
      break;
    case WStype_TEXT:
      Serial.print("Received message from server: ");
      Serial.println((char*)payload);
      break;
    case WStype_DISCONNECTED:
      Serial.println("Disconnected from WebSocket server");
      break;
  }
}
