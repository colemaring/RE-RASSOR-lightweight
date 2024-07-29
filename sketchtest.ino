#include <WiFi.h>
#include <WebSocketsClient.h>
#include <AccelStepper.h>
#include <ArduinoJson.h>

const char* ssid = "Wokwi-GUEST";
const char* host = "161.35.13.104";
const uint16_t port = 8080;
const char* url = "/?name=esp321";
const char* protocol = "ws";

WiFiClient client;
WebSocketsClient ws;

// Stepper motor settings
const int motorEnablePin = 8;
const int motorStepPin = 9;
const int motorDirPin = 10;
const int motorSpeed = 1000; // steps per second

AccelStepper stepper(1, motorStepPin, motorDirPin);

bool motorRunning = false;

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

  // Initialize stepper motor
  stepper.setEnablePin(motorEnablePin);
  stepper.setPinsInverted(false, false, true);
  stepper.setCurrentPosition(0);
  stepper.setMaxSpeed(motorSpeed);
  stepper.setAcceleration(motorSpeed);
}

void loop() {
  ws.loop();

  if (motorRunning) {
    stepper.runSpeed();
  }
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

      // Parse JSON message from server
      DynamicJsonDocument jsonDoc(2048);
      jsonDoc.parse((char*)payload);

      if (jsonDoc.containsKey("type") && jsonDoc["type"] == "move") {
        String direction = jsonDoc["direction"];

        if (direction == "forwards") {
          stepper.setSpeed(motorSpeed);
          motorRunning = true;
        } else if (direction == "backwards") {
          stepper.setSpeed(-motorSpeed);
          motorRunning = true;
        } else if (direction == "stop") {
          motorRunning = false;
        }
      }
      break;
    case WStype_DISCONNECTED:
      Serial.println("Disconnected from WebSocket server");
      break;
  }
}
