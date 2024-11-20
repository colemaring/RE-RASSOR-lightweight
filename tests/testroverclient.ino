#include <WiFi.h>
#include <WebSocketsClient.h>

const char *ssid = "Wokwi-GUEST";
const char *password = "";
const char *host = "rerassor.com";
const uint16_t port = 8080;
const char *url = "/?name=testrover&secret=1234";
const char *protocol = "ws";

WiFiClient client;
WebSocketsClient ws;


unsigned long lastConnectionCheck = 0;
const unsigned long connectionCheckInterval = 5000; // 5 seconds

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
}

void loop()
{
    ws.loop();

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
    }

    
}
