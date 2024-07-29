#include <WiFi.h>
#include <WebSocketsClient.h>
#include <AccelStepper.h>
#include <ArduinoJson.h>

const char* ssid = "helloworld";
const char* password = "12341234";
const char* host = "161.35.13.104";
const uint16_t port = 8080;
const char* url = "/?name=esp321";
const char* protocol = "ws";

WiFiClient client;
WebSocketsClient ws;

// Stepper motor settings
#define dirPin 15
#define stepPin 2
#define dirPin2 4
#define stepPin2 5
#define motorInterfaceType 1

// Create a new instance of the AccelStepper class:
AccelStepper stepper = AccelStepper(motorInterfaceType, stepPin, dirPin);
AccelStepper stepper2 = AccelStepper(motorInterfaceType, stepPin2, dirPin2);

bool motorRunning = false;
const int motorSpeed = 500; // Adjust this value as needed

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Connect to WebSocket server
  ws.begin(host, port, url, protocol);
  ws.onEvent(onWsEvent);

  stepper.setMaxSpeed(1000);
  stepper2.setMaxSpeed(1000);
}

void loop() {
  ws.loop();

  if (motorRunning) {
    stepper.runSpeed();
    stepper2.runSpeed();
  }
}

void onWsEvent(WStype_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.println("Disconnected from WebSocket server");
      break;
    case WStype_CONNECTED:
      Serial.println("Connected to WebSocket server");
      ws.sendTXT("{\"type\":\"getConnectedClients\"}");
      break;
    case WStype_TEXT:
      Serial.print("Received message from server: ");
      Serial.println((char*)payload);

      // Parse JSON message from server
      DynamicJsonDocument jsonDoc(2048);
      deserializeJson(jsonDoc, (char*)payload);

      if (jsonDoc.containsKey("type") && jsonDoc["type"] == "move") {
        String direction = jsonDoc["direction"];
        Serial.print("parsed " +  direction);

        if (direction == "forward") {
          stepper.setSpeed(motorSpeed);
          stepper2.setSpeed(motorSpeed);
          motorRunning = true;
        } else if (direction == "backward") {
          stepper.setSpeed(-motorSpeed);
          stepper2.setSpeed(motorSpeed);
          motorRunning = true;
        } else if (direction == "stop") {
          motorRunning = false;
        }
      }
      break;
  }
}
