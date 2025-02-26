A lightweight web teleoperations interface and data dashboard for the RE-RASSOR project. https://rerassor.com/ <br>
Documentation, assembly, and notes found here: [PDF](https://docs.google.com/document/d/1AeGxqEQWhP8_XDPpjoR6U5f-afnMtCq_Ek1jETLCfaA/export?format=pdf) <br>

# Features:
- Network agnostic. The controller and rover can be on different wifi networks <br>
- Sub 100ms latency between button click and stepper action <br>
- Easy setup. Just flash the esp32, enter wifi credentials, name your rover, and you're done <br>
- Real-time video feed and visualization of on-board telemetry <br>

# TODO:
dropdown for rover theme. blue & white, UCF, black, rainbow moving  <br>
change type of message to "INFO" and pass in IMU, latency, current wheel speed, etc <br>
implement camera feed into WSS stream <br>
CI/CD w Docker on AWS <br>
