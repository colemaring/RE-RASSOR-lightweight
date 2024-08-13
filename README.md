A React &amp; Node web-app which uses WebSockets to communicate with an internet connected ESP32. <br>

# Features:
- You dont need to have the rover and the controller on the same wifi network. As long as they both have internet access it will work <br>
- Sub 100ms latency between button click and stepper action <br>
- No need for overpowered Raspberry Pi and ROS <br>
- No need to setup and configure the Raspberry Pi, just flash the esp32, enter wifi credentials, name your rover, and you're done <br
- Can handle multiple concurrent connections to the same rover or independent rovers <br>

# Demo (WIP)
![rovervid](https://github.com/user-attachments/assets/94a0e8aa-6b02-4dfe-904e-9230c7cfa464)


# Current UI
![Screenshot 2024-08-08 155605](https://github.com/user-attachments/assets/68521e46-437e-4adb-a106-f6c1c0f90400)


# Wiring Diagram
![Screenshot 2024-08-09 131836](https://github.com/user-attachments/assets/acc93fce-45c7-4669-a0e9-b46a1a0db585)


# Electronics
 - ESP32 <br>
 - 4x A4988 motor drivers (to be replaced by tmc2208) <br>
 - 4x Nema 17 stepper motors <br>
 - 12v power source <br>
 - 12v to 5v converter or buck converter <br>
 - wires <br>

Assembly documentation: https://docs.google.com/document/d/1jhzQ0pJI8P-jmU7yeFxD81gAwapxjM90a2alEfP4OI4/edit#heading=h.j3emiwso5d2c <br>

# Server setup:
install node <br>
git clone this repo <br>
cd into rover <br>
npm install <br>
run server.js with either node or a node process manager like pm2 <br>
make sure firewalls arent blocking port 80 or 8080 <br>


# TODO:
replace a4988 drivers with tmc2208 drivers <br>
speed slider <br>
video feed <br>
design button hold and release system? better UX? <br>
 - message only sent on initial pressdown of button and release, no need for constant sending <br>
