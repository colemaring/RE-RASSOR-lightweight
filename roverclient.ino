#include <WiFi.h>
#include <WebSocketsClient.h>
#include <TMC2208Stepper.h>
#include <ArduinoJson.h>
#include <math.h>

const char *ssid = "ExolithLab";
const char *password = "";
const char *host = "rerassor.com";
const uint16_t port = 8080;
const char *url = "/?name=testrover&secret=123";
const char *protocol = "ws";

WiFiClient client;
WebSocketsClient ws;

// stepper motor pins
#define dirPinFrontLeft 32
#define stepPinFrontLeft 22
#define dirPinFrontRight 25
#define stepPinFrontRight 26
#define dirPinRearLeft 13
#define stepPinRearLeft 12
#define dirPinRearRight 16
#define stepPinRearRight 4
#define EN_PIN1 33 // LOW: Driver enabled. HIGH: Driver disabled
#define EN_PIN2 27 // LOW: Driver enabled. HIGH: Driver disabled
#define EN_PIN3 14 // LOW: Driver enabled. HIGH: Driver disabled
#define EN_PIN4 5 // LOW: Driver enabled. HIGH: Driver disabled
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

    // connect to WebSocket server
    ws.begin(host, port, url, protocol);
    ws.onEvent(onWsEvent);
}

void loop()
{
    ws.loop();

    if (motorRunning)
    {
        if (!initialized)
        {
            currentDelay = 1000;
            initialized = true;
        }

        // Calculate the target delay based on the speedMultiplier
        unsigned long targetDelay = 100 * (10 - pow(speedVal, 2));

        if (speedVal == 0.2)
          targetDelay = 3000;
          
        // Accelerate to the target speed
        if (currentDelay > targetDelay) {
            currentDelay -= 1;
            if (currentDelay < targetDelay)
                currentDelay = targetDelay;
        } else if (currentDelay < targetDelay) {
            currentDelay += 1;
            if (currentDelay > targetDelay)
                currentDelay = targetDelay;
        }

        // Rotate motors
        digitalWrite(stepPinFrontLeft, !digitalRead(stepPinFrontLeft));
        digitalWrite(stepPinFrontRight, !digitalRead(stepPinFrontRight));
        digitalWrite(stepPinRearLeft, !digitalRead(stepPinRearLeft));
        digitalWrite(stepPinRearRight, !digitalRead(stepPinRearRight));
        delayMicroseconds(currentDelay);
    }
    if (millis() - lastConnectionCheck >= connectionCheckInterval)
    {
        lastConnectionCheck = millis();
        if (!ws.isConnected())
        {
            Serial.println("Connection lost, attempting to reconnect...");
            ws.begin(host, port, url, protocol);
        }
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

            if (direction == "forward" || direction == "backward" || direction == "left" || direction == "right")
            {
                digitalWrite(EN_PIN1, LOW); // Enable driver 1
                digitalWrite(EN_PIN2, LOW); // Enable driver 2
                digitalWrite(EN_PIN3, LOW); // Enable driver 3
                digitalWrite(EN_PIN4, LOW); // Enable driver 4
            }

            if (direction == "forward")
            {
                digitalWrite(dirPinFrontLeft, false); // Set direction
                digitalWrite(dirPinFrontRight, true);
                digitalWrite(dirPinRearLeft, false);
                digitalWrite(dirPinRearRight, true);
                motorRunning = true;
            }
            else if (direction == "backward")
            {
                digitalWrite(dirPinFrontLeft, true); // Set direction
                digitalWrite(dirPinFrontRight, false);
                digitalWrite(dirPinRearLeft, true);
                digitalWrite(dirPinRearRight, false);
                motorRunning = true;
            }
            else if (direction == "left")
            {
                digitalWrite(dirPinFrontLeft, true); // Set direction
                digitalWrite(dirPinFrontRight, true);
                digitalWrite(dirPinRearLeft, true);
                digitalWrite(dirPinRearRight, true);
                motorRunning = true;
            }
            else if (direction == "right")
            {
                digitalWrite(dirPinFrontLeft, false); // Set direction
                digitalWrite(dirPinFrontRight, false);
                digitalWrite(dirPinRearLeft, false);
                digitalWrite(dirPinRearRight, false);
                motorRunning = true;
            }
            else if (direction == "stop")
            {
                motorRunning = false;
                initialized = false;
                digitalWrite(EN_PIN1, HIGH); // Disable driver 1
                digitalWrite(EN_PIN2, HIGH); // Disable driver 2
                digitalWrite(EN_PIN3, HIGH); // Disable driver 3
                digitalWrite(EN_PIN4, HIGH); // Disable driver 4
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
