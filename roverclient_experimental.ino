#include <WiFi.h>
#include <Wire.h>
#include <WebSocketsClient.h>
#include <TMC2208Stepper.h>
#include <ArduinoJson.h>
#include <math.h>
#include <MPU9250.h>

const char *ssid = "ExolithLab";
const char *password = "";
const char *host = "rerassor.com";
const uint16_t port = 8080;
const char *url = "/?name=testrover&secret=123";
const char *protocol = "ws";

MPU9250 mpu;
WiFiClient client;
WebSocketsClient ws;
String direction;

// stepper motor pins
#define dirPinFrontLeft 32
#define stepPinFrontLeft 22
#define dirPinFrontRight 25
#define stepPinFrontRight 26
#define dirPinRearLeft 13
#define stepPinRearLeft 12
#define dirPinRearRight 16
#define stepPinRearRight 4
#define EN_PIN1 33 // LOW: Driver enabled. HIGH: Driver disabled | front left
#define EN_PIN2 27 // LOW: Driver enabled. HIGH: Driver disabled | front right
#define EN_PIN3 14 // LOW: Driver enabled. HIGH: Driver disabled | rear left
#define EN_PIN4 5 //  LOW: Driver enabled. HIGH: Driver disabled | rear right
#define motorInterfaceType 1

TMC2208Stepper driver1 = TMC2208Stepper(&Serial1);
TMC2208Stepper driver2 = TMC2208Stepper(&Serial1);
TMC2208Stepper driver3 = TMC2208Stepper(&Serial1);
TMC2208Stepper driver4 = TMC2208Stepper(&Serial1);

bool motorRunning = false;
double speedMultiplier = 1;
double speedVal = 1;
static bool initialized = false;
static unsigned long currentDelay = 1000;

unsigned long lastConnectionCheck = 0;
const unsigned long connectionCheckInterval = 5000; // 5 seconds
unsigned long lastMpuUpdate = 0;
const unsigned long mpuUpdateInterval = 200;

void setup()
{
    Serial.begin(115200);
    driver1.push();
    driver2.push();
    driver3.push();
    driver4.push();

    // Setup for driver 1
    pinMode(EN_PIN1, OUTPUT);
    pinMode(stepPinFrontLeft, OUTPUT);
    pinMode(dirPinFrontLeft, OUTPUT); // Set DIR_PIN as output
    digitalWrite(EN_PIN1, HIGH);      // Disable driver in hardware

    driver1.pdn_disable(true);     // Use PDN/UART pin for communication
    driver1.I_scale_analog(false); // Use internal voltage reference
    driver1.rms_current(800);      // Set driver current 500mA
    driver1.toff(2);               // Enable driver in software

    digitalWrite(dirPinFrontLeft, HIGH); // Set direction to clockwise (or LOW for counter-clockwise)
    uint32_t data1 = 0;
    Serial.print("DRV_STATUS = 0x");
    driver1.DRV_STATUS(&data1);
    Serial.println(data1, HEX);

    // Setup for driver 2
    pinMode(EN_PIN2, OUTPUT);
    pinMode(stepPinFrontRight, OUTPUT);
    pinMode(dirPinFrontRight, OUTPUT); // Set DIR_PIN as output
    digitalWrite(EN_PIN2, HIGH);       // Disable driver in hardware

    driver2.pdn_disable(true);     // Use PDN/UART pin for communication
    driver2.I_scale_analog(false); // Use internal voltage reference
    driver2.rms_current(800);      // Set driver current 500mA
    driver2.toff(2);               // Enable driver in software

    digitalWrite(dirPinFrontRight, HIGH); // Set direction to clockwise (or LOW for counter-clockwise)
    uint32_t data2 = 0;
    Serial.print("DRV_STATUS = 0x");
    driver2.DRV_STATUS(&data2);
    Serial.println(data2, HEX);

    // Setup for driver 3
    pinMode(EN_PIN3, OUTPUT);
    pinMode(stepPinRearLeft, OUTPUT);
    pinMode(dirPinRearLeft, OUTPUT); // Set DIR_PIN as output
    digitalWrite(EN_PIN3, HIGH);     // Disable driver in hardware

    driver3.pdn_disable(true);     // Use PDN/UART pin for communication
    driver3.I_scale_analog(false); // Use internal voltage reference
    driver3.rms_current(800);      // Set driver current 500mA
    driver3.toff(2);               // Enable driver in software

    digitalWrite(dirPinRearLeft, HIGH); // Set direction to clockwise (or LOW for counter-clockwise)
    uint32_t data3 = 0;
    Serial.print("DRV_STATUS = 0x");
    driver3.DRV_STATUS(&data3);
    Serial.println(data3, HEX);

    // Setup for driver 4
    pinMode(EN_PIN4, OUTPUT);
    pinMode(stepPinRearRight, OUTPUT);
    pinMode(dirPinRearRight, OUTPUT); // Set DIR_PIN as output
    digitalWrite(EN_PIN4, HIGH);      // Disable driver in hardware

    driver4.pdn_disable(true);     // Use PDN/UART pin for communication
    driver4.I_scale_analog(false); // Use internal voltage reference
    driver4.rms_current(800);      // Set driver current 500mA
    driver4.toff(2);               // Enable driver in software

    digitalWrite(dirPinRearRight, HIGH); // Set direction to clockwise (or LOW for counter-clockwise)
    uint32_t data4 = 0;
    Serial.print("DRV_STATUS = 0x");
    driver4.DRV_STATUS(&data4);
    Serial.println(data4, HEX);

    // connect to Wi-Fi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(400);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");

    Wire.begin(2, 15); // SDA, SCL - adjust if needed
    delay(200);
    mpu.setup(0x68); // I2C address of MPU9250

    // connect to WebSocket server
    ws.begin(host, port, url, protocol);
    ws.onEvent(onWsEvent);
}
unsigned long lastLeftStep = 0;
unsigned long lastRightStep = 0;
unsigned long lastAllStep = 0;

void loop() {
  ws.loop();

  // Get current time in microseconds
  unsigned long currentMicros = micros();
  // Calculate base delay for full-speed stepping (adjust formula as needed)
  int fullSpeedDelay = 3000 / (speedVal * 10);  // delay in microseconds
  int halfSpeedDelay = fullSpeedDelay * 2;

  if (motorRunning) {
    // When turning, apply different speeds to left/right motors.
    if (direction == "forwardLeft") {
    // Turning LEFT: Right side full speed, Left side half speed.
      if (currentMicros - lastRightStep >= fullSpeedDelay) {
          // Right side motors (front and rear) step at full speed.
          digitalWrite(stepPinFrontRight, !digitalRead(stepPinFrontRight));
          digitalWrite(stepPinRearRight, !digitalRead(stepPinRearRight));
          lastRightStep = currentMicros;
      }

      if (currentMicros - lastLeftStep >= halfSpeedDelay) {
          // Left side motors (front and rear) step at half speed.
          digitalWrite(stepPinFrontLeft, !digitalRead(stepPinFrontLeft));
          digitalWrite(stepPinRearLeft, !digitalRead(stepPinRearLeft));
          lastLeftStep = currentMicros;
      }
    }
    else if (direction == "forwardRight") {
      // Turning RIGHT: Left side full speed, Right side half speed.
      if (currentMicros - lastLeftStep >= fullSpeedDelay) {
          // Left side motors (front and rear) step at full speed.
          digitalWrite(stepPinFrontLeft, !digitalRead(stepPinFrontLeft));
          digitalWrite(stepPinRearLeft, !digitalRead(stepPinRearLeft));
          lastLeftStep = currentMicros;
      }

      if (currentMicros - lastRightStep >= halfSpeedDelay) {
          // Right side motors (front and rear) step at half speed.
          digitalWrite(stepPinFrontRight, !digitalRead(stepPinFrontRight));
          digitalWrite(stepPinRearRight, !digitalRead(stepPinRearRight));
          lastRightStep = currentMicros;
      }
    }

    else if (direction == "backwardRight") {
    // Turning LEFT: Right side full speed, Left side half speed.
      if (currentMicros - lastRightStep >= fullSpeedDelay) {
          // Right side motors (front and rear) step at full speed.
          digitalWrite(stepPinFrontRight, !digitalRead(stepPinFrontRight));
          digitalWrite(stepPinRearRight, !digitalRead(stepPinRearRight));
          lastRightStep = currentMicros;
      }

      if (currentMicros - lastLeftStep >= halfSpeedDelay) {
          // Left side motors (front and rear) step at half speed.
          digitalWrite(stepPinFrontLeft, !digitalRead(stepPinFrontLeft));
          digitalWrite(stepPinRearLeft, !digitalRead(stepPinRearLeft));
          lastLeftStep = currentMicros;
      }
    }
    else if (direction == "backwardLeft") {
      // Turning RIGHT: Left side full speed, Right side half speed.
      if (currentMicros - lastLeftStep >= fullSpeedDelay) {
          // Left side motors (front and rear) step at full speed.
          digitalWrite(stepPinFrontLeft, !digitalRead(stepPinFrontLeft));
          digitalWrite(stepPinRearLeft, !digitalRead(stepPinRearLeft));
          lastLeftStep = currentMicros;
      }

      if (currentMicros - lastRightStep >= halfSpeedDelay) {
          // Right side motors (front and rear) step at half speed.
          digitalWrite(stepPinFrontRight, !digitalRead(stepPinFrontRight));
          digitalWrite(stepPinRearRight, !digitalRead(stepPinRearRight));
          lastRightStep = currentMicros;
      }
    }
    // When moving forward or backward, all motors step together.
    else if (direction == "forward" || direction == "backward" || direction == "left" || direction == "right") {
      if (currentMicros - lastAllStep >= fullSpeedDelay) {
        digitalWrite(stepPinFrontRight, !digitalRead(stepPinFrontRight));
        digitalWrite(stepPinRearRight, !digitalRead(stepPinRearRight));
        digitalWrite(stepPinFrontLeft, !digitalRead(stepPinFrontLeft));
        digitalWrite(stepPinRearLeft, !digitalRead(stepPinRearLeft));
        lastAllStep = currentMicros;
      }
    }
  }

    // TODO
    // need to use a non-blocking MPU9250 library, as the current implementation will throw off the timing and speed of the stepper motors
    // if (mpu.update()) {
    //   static uint32_t prev_ms_imu = millis();
    //   if (millis() > prev_ms_imu + 200) {
    //     float yaw = mpu.getYaw();
    //     float pitch = mpu.getPitch();
    //     float roll = mpu.getRoll();
    //     DynamicJsonDocument jsonDoc(256);

    //     jsonDoc["type"] = "IMU";
    //     jsonDoc["url"] = url;
    //     jsonDoc["yaw"] = yaw;
    //     jsonDoc["pitch"] = pitch;
    //     jsonDoc["roll"] = roll;

    //     String jsonString;
    //     serializeJson(jsonDoc, jsonString);
    //     Serial.println("sent: ");
    //     Serial.println(jsonString);
    //     ws.sendTXT(jsonString);

    //     prev_ms_imu = millis();
    //   }
    // }
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
            direction = jsonDoc["direction"].as<String>();
            Serial.print("parsed " + direction);

            if (direction == "forward" || direction == "backward" || direction == "left" || direction == "right" || direction == "forwardLeft" || direction == "forwardRight" || direction == "backwardLeft" || direction == "backwardRight") 
            {
                digitalWrite(EN_PIN1, LOW); // Enable driver
                digitalWrite(EN_PIN2, LOW); // Enable driver
                digitalWrite(EN_PIN3, LOW); // Enable driver
                digitalWrite(EN_PIN4, LOW); // Enable driver
            }

            if (direction == "forward")
            {
                digitalWrite(dirPinFrontLeft, false);
                digitalWrite(dirPinFrontRight, true);
                digitalWrite(dirPinRearLeft, false);
                digitalWrite(dirPinRearRight, true);
                motorRunning = true;
            }
            else if (direction == "backward")
            {
                digitalWrite(dirPinFrontLeft, true);
                digitalWrite(dirPinFrontRight, false);
                digitalWrite(dirPinRearLeft, true);
                digitalWrite(dirPinRearRight, false);
                motorRunning = true;
            }
            
            else if (direction == "forwardLeft")
            {
                digitalWrite(dirPinFrontLeft, false);
                digitalWrite(dirPinFrontRight, true);
                digitalWrite(dirPinRearLeft, false);
                digitalWrite(dirPinRearRight, true);
                motorRunning = true;
            }
            else if (direction == "forwardRight")
            {
                digitalWrite(dirPinFrontLeft, false);
                digitalWrite(dirPinFrontRight, true);
                digitalWrite(dirPinRearLeft, false);
                digitalWrite(dirPinRearRight, true);
                motorRunning = true;
            }
            else if (direction == "backwardLeft")
            {
                digitalWrite(dirPinFrontLeft, true);
                digitalWrite(dirPinFrontRight, false);
                digitalWrite(dirPinRearLeft, true);
                digitalWrite(dirPinRearRight, false);
                motorRunning = true;
            }
            else if (direction == "backwardRight")
            {
                digitalWrite(dirPinFrontLeft, true);
                digitalWrite(dirPinFrontRight, false);
                digitalWrite(dirPinRearLeft, true);
                digitalWrite(dirPinRearRight, false);
                motorRunning = true;
            }
            else if (direction == "left")
            {
                digitalWrite(dirPinFrontLeft, true);
                digitalWrite(dirPinFrontRight, true);
                digitalWrite(dirPinRearLeft, true);
                digitalWrite(dirPinRearRight, true);
                motorRunning = true;
            }
            else if (direction == "right")
            {
                digitalWrite(dirPinFrontLeft, false);
                digitalWrite(dirPinFrontRight, false);
                digitalWrite(dirPinRearLeft, false);
                digitalWrite(dirPinRearRight, false);
                motorRunning = true;
            }
            else if (direction == "stop")
            {
                motorRunning = false;
                initialized = false;
                digitalWrite(EN_PIN1, HIGH); // Disable driver
                digitalWrite(EN_PIN2, HIGH); // Disable driver
                digitalWrite(EN_PIN3, HIGH); // Disable driver
                digitalWrite(EN_PIN4, HIGH); // Disable driver
            }
        }

        else if (jsonDoc.containsKey("type") && jsonDoc["type"] == "speed")
        {
            double speed = jsonDoc["speed"].as<double>();
            Serial.print("parsed " + String(speed));
            speedVal = speedMultiplier * speed;
        }
        break;
    }
}
