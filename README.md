A lightweight web teleoperations interface and data dashboard for the RE-RASSOR project. https://rerassor.com/ <br><br>

Documentation, assembly, and notes found here: [Drive link](https://drive.google.com/drive/folders/1gh6lrkOwWv0ZDy4qrbicX4A5fCzM1dyK) <br><br>

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
fork this repo <br>
change the ip in the roverclient.ino file to match the domain or ipv4 of the server your are hosting <br>
change the ip in App.jsx and rebuild the frontend using npm vite build (when you do this move the new dist file into the server folder) <br>
install node <br>
git clone this repo <br>
cd into server <br>
npm install <br>
run server.js with either node or a node process manager like pm2 <br>
make sure firewalls arent blocking port 80 or 8080 <br>

# TODO:
CI/CD w Docker on AWS <br>
test PCB seen [here](https://imgur.com/a/I4IoIK9) <br>
new PCB with IMU, more TMC2208 slots, integrated buck converter, and camera connector? <br>
lower turning speed <br>
implement IMU and camera feed into WSS stream <br>

