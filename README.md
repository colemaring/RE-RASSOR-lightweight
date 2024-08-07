A React &amp; Node web-app which uses WebSockets to communicate with an internet connected ESP32. <br>

# Benefits to this over Senior Design's implementation:
- You dont need to have the rover and the controller on the same wifi network. As long as they both have internet access it will work <br>
- Sub 100ms latency between button click and stepper action <br>
- No need for overpowered Raspberry Pi and ROS <br>
- No need to setup and configure the Raspberry Pi, just flash the esp32, enter wifi credentials, name your rover, and you're done <br>

# Current UI
 ![Screenshot 2024-08-07 152919](https://github.com/user-attachments/assets/8a0c63d5-a183-4b93-bc53-5b4104ce17ba)


# Wiring Diagram
![Screenshot 2024-08-07 152440](https://github.com/user-attachments/assets/7f3dbc7d-6eaa-4e81-8bc7-af5b122c754c)

# Electronics
 - ESP32 <br>
 - 4x A4988 motor drivers <br>
 - 4x Nema 17 stepper motors <br>
 - 12v power source <br>
 - 12v to 5v converter or buck converter <br>
 - wires <br>

Assembly documentation: https://docs.google.com/document/d/1jhzQ0pJI8P-jmU7yeFxD81gAwapxjM90a2alEfP4OI4/edit#heading=h.j3emiwso5d2c <br>

# TODO:
work on 4 wheel independent motor drivers <br>
handle concurrent connections to same rover or independent rovers <br>
solve ungraceful disconnect so server knows when client disconnects <br>
speed slider <br>
turning buttons <br>
design button hold and release system <br>
 - message only sent on initial pressdown of button and release, no need for constant sending <br>
