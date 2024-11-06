A lightweight web teleoperations interface and data dashboard for the RE-RASSOR project. https://rerassor.com/ <br>
Documentation, assembly, and notes found here: [Drive link](https://drive.google.com/drive/folders/1gh6lrkOwWv0ZDy4qrbicX4A5fCzM1dyK) <br>

# Features:
- Network agnostic. The controller and rover can be on different wifi networks <br>
- Sub 100ms latency between button click and stepper action <br>
- Easy setup. Just flash the esp32, enter wifi credentials, name your rover, and you're done <br>
- Real-time video feed and visualization of on-board telemetry <br>

# Setup:
download and open roverclient.ino with Arduino IDE <br>
change the following variables to match your network, and choose a custom rover name <br>
```
const char* ssid = "yourssid";
const char *password = "yourpassword";
const char *url = "/?name=yournamehere";
```
follow [these instructions](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/) to add esp32 board to the IDE <br>
plug in the esp32, select esp32 dev module as the board, and select the corresponding com port <br>
upload the sketch <br>
assuming that the network you provided has internet, you should see the rover listed on rerassor.com <br>

# ONLY IF you are to host YOUR OWN server, follow these steps:
build <br>
```docker build --no-cache -t re-rassor-lightweight .```

docker container<br>
```docker run -p 8080:8080 -p 443:443 -p 80:80 -e SSL_KEY=<raw text key> SSL_CERT=<raw text cert> re-rassor-lightweight```

server (linux server)<br>
```docker run -p 8080:8080 -p 443:443 -p 80:80 -e SSL_KEYPATH=/etc/letsencrypt/live/rerassor.com/privkey.pem SSL_CERTPATH=/etc/letsencrypt/live/rerassor.com/fullchain.pem re-rassor-lightweight```

dev (run locally)<br>
```docker run -p 8080:8080 -p 443:443 -p 80:80 -e NODE_ENV=dev re-rassor-lightweight```

# TODO:
CI/CD w Docker on AWS <br>
new PCB with IMU, more TMC2208 slots, integrated buck converter, and camera connector? <br>
lower turning speed <br>
implement IMU and camera feed into WSS stream <br>
