A lightweight web teleoperations interface and data dashboard for the RE-RASSOR project. https://rerassor.com/ <br>
Documentation, assembly, and notes found here: [Drive link](https://drive.google.com/drive/folders/1gh6lrkOwWv0ZDy4qrbicX4A5fCzM1dyK) <br>

# Features:
- Network agnostic. The controller and rover can be on different wifi networks <br>
- Sub 100ms latency between button click and stepper action <br>
- Easy setup. Just flash the esp32, enter wifi credentials, name your rover, and you're done <br>
- Real-time video feed and visualization of on-board telemetry <br>

# Setup:
1. Download and open roverclient.ino with Arduino IDE <br>
2. Change the following variables to match your network, and choose a custom rover name and secret <br>
```
const char* ssid = "yourssid";
const char *password = "yourpassword";
const char *url = "/?name=yournamehere&yoursecrethere";
```
3. Follow [these instructions](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/) to add esp32 board to the IDE <br>
4. Install the following libraries (latest version is fine) (needs updated to include MPU9250 lib) <br>
![Screenshot 2024-11-20 092453](https://github.com/user-attachments/assets/596812a8-027c-4a6e-9189-372605152751)<br>
5. Plug in the esp32, select esp32 dev module as the board, and select the corresponding com port <br>
6. Upload the sketch <br>
assuming that the network you provided has internet, you should see the rover listed on rerassor.com <br>

# ONLY IF you are to host YOUR OWN server, follow these steps:
build <br>
```docker build --no-cache -t re-rassor-lightweight .```

dev (run locally)<br>
```docker run -p 8080:8080 -p 443:443 -p 80:80 -e NODE_ENV=dev re-rassor-lightweight```

ECS, if you don't know what this does, ignore it<br>
```docker run -p 8080:8080 -p 443:443 -p 80:80 -e SSL_KEY=<raw text key> SSL_CERT=<raw text cert> re-rassor-lightweight```

EC2, if you don't know what this does, ignore it<br>
```docker run -p 8080:8080 -p 443:443 -p 80:80 -e SSL_KEYPATH=/etc/letsencrypt/live/rerassor.com/privkey.pem SSL_CERTPATH=/etc/letsencrypt/live/rerassor.com/fullchain.pem re-rassor-lightweight```


# TODO:
change type of message to "INFO" and pass in IMU, latency, current wheel speed, etc <br>
implement camera feed into WSS stream <br>
lower turning speed <br>
CI/CD w Docker on AWS <br>

# Notes/Troubleshooting:
If Arduino IDE error about entering flash mode, unplug IMU connections. see (https://randomnerdtutorials.com/esp32-pinout-reference-gpios/). GPIO 2 connected to on-board LED, must be left floating or LOW to enter flashing mode.
