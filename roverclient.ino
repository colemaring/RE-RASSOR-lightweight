#include <WiFi.h>
#include <WebSocketsClient.h>
#include <AccelStepper.h>
#include <ArduinoJson.h>

const char *ssid = "helloworld";
const char *password = "12341234";
const char *host = "161.35.13.104";
const uint16_t port = 8080;
const char *url = "/?name=esp321";
const char *protocol = "ws";

WiFiClient client;
WebSocketsClient ws;

// stepper motor pins
#define dirPinFrontLeft 15
#define stepPinFrontLeft 2
#define dirPinFrontRight 4
#define stepPinFrontRight 5
#define dirPinRearLeft 19
#define stepPinRearLeft 18
#define dirPinRearRight 21
#define stepPinRearRight 22
#define motorInterfaceType 1

AccelStepper stepperFL = AccelStepper(motorInterfaceType, stepPinFrontLeft, dirPinFrontLeft);
AccelStepper stepperFR = AccelStepper(motorInterfaceType, stepPinFrontRight, dirPinFrontRight);
AccelStepper stepperRL = AccelStepper(motorInterfaceType, stepPinRearLeft, dirPinRearLeft);
AccelStepper stepperRR = AccelStepper(motorInterfaceType, stepPinRearRight, dirPinRearRight);

bool motorRunning = false;
const int motorSpeed = 500;

void setup()
{
  Serial.begin(115200);

  // connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // connect to WebSocket server
  ws.begin(host, port, url, protocol);
  ws.onEvent(onWsEvent);

  stepperFL.setMaxSpeed(1000);
  stepperFR.setMaxSpeed(1000);
  stepperRL.setMaxSpeed(1000);
  stepperRR.setMaxSpeed(1000);
}

void loop()
{
  ws.loop();

  if (motorRunning)
  {
    stepperFL.runSpeed();
    stepperFR.runSpeed();
    stepperRL.runSpeed();
    stepperRR.runSpeed();
  }
}

void onWsEvent(WStype_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case WStype_DISCONNECTED:
    Serial.println("Disconnected from WebSocket server");
    break;
  case WStype_CONNECTED:
    Serial.println("Connected to WebSocket server");
    ws.sendTXT("{\"type\":\"getConnectedClients\"}");
    break;
  case WStype_TEXT:
    Serial.print("Received message from server: ");
    Serial.println((char *)payload);

    // Parse JSON message from server
    DynamicJsonDocument jsonDoc(2048);
    deserializeJson(jsonDoc, (char *)payload);

    if (jsonDoc.containsKey("type") && jsonDoc["type"] == "move")
    {
      String direction = jsonDoc["direction"];
      Serial.print("parsed " + direction);

      if (direction == "forward")
      {
        stepperFL.setSpeed(motorSpeed);
        stepperFR.setSpeed(-motorSpeed);
        stepperRL.setSpeed(motorSpeed);
        stepperRR.setSpeed(-motorSpeed);
        motorRunning = true;
      }
      else if (direction == "backward")
      {
        stepperFL.setSpeed(-motorSpeed);
        stepperFR.setSpeed(motorSpeed);
        stepperRL.setSpeed(-motorSpeed);
        stepperRR.setSpeed(motorSpeed);
        motorRunning = true;
      }
      else if (direction == "left")
      {
        stepperFL.setSpeed(-motorSpeed);
        stepperFR.setSpeed(-motorSpeed);
        stepperRL.setSpeed(-motorSpeed);
        stepperRR.setSpeed(-motorSpeed);
        motorRunning = true;
      }
      else if (direction == "right")
      {
        stepperFL.setSpeed(motorSpeed);
        stepperFR.setSpeed(motorSpeed);
        stepperRL.setSpeed(motorSpeed);
        stepperRR.setSpeed(motorSpeed);
        motorRunning = true;
      }
      else if (direction == "stop")
      {
        motorRunning = false;
      }
    }
    break;
  }
}
