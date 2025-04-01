import React from "react";
import MyNavbar from "../components/MyNavbar";
import rover1 from "../assets/fsirover.jpg";
import motortest from "../assets/motortest.jpg";
import modifiedhousing from "../assets/modified_old_motorhousing.jpg";
import oldrovernowheels from "../assets/rover_nowheels.jpg";
import oldorverassembled from "../assets/oldgearboxrover.jpg";
import testing from "../assets/testing.jpg";
import roverbin from "../assets/roverinbin.jpg";
import exolithtestpc from "../assets/exolithtestpc.jpg";
import esp32rovertest from "../assets/esp32rovertest.jpg";
import explodedv1 from "../assets/explodedv1.png";
import v1open from "../assets/v1open.jpg";
import v1onrovernowheels from "../assets/v1rovernowheels.jpg";
import v1onrover from "../assets/v1onrover.jpg";
import v1implemented from "../assets/v1implemented.jpg";
import roverandlaptop from "../assets/roverandlaptop.jpg";
import esp32wiring from "../assets/esp32wiring.jpg";
import explodedv2 from "../assets/explodedv2.png";
import graph from "../assets/graph.png";
import boardwired from "../assets/boardwired.jpg";
import boardplain from "../assets/boardplain.jpg";
import PCBscreenshot from "../assets/PCBscreenshot.png";
import boardtogether from "../assets/boardtogether.jpg";
import pcbv2 from "../assets/pcbv2.png";
import completerassorv2 from "../assets/completerassorv2.png";
import electronicswiringv2 from "../assets/electronicswiringv2.png";
import pcbv3 from "../assets/pcbv3.jpg";
import rovers3 from "../assets/rovers3.jpg";

function Media() {
  return (
    <>
      <MyNavbar />
      <h2 style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
        Images are in chronological order
      </h2>
      <p>Hover for a short description</p>
      <img
        src={rover1}
        alt={"FSI's built rover"}
        title={"FSI's built rover"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={motortest}
        alt={"Testing motors with new ESP32 implementation"}
        title={"Testing motors with new ESP32 implementation"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={modifiedhousing}
        alt={"After modifying the design of the motor housing"}
        title={"After modifying the design of the motor housing"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={oldrovernowheels}
        alt={
          "Rover assembled using modified design of old motor housing, without wheels"
        }
        title={
          "Rover assembled using modified design of old motor housing, without wheels"
        }
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={testing}
        alt={
          "Rover assembled using modified design of old motor housing, without wheels"
        }
        title={
          "Rover assembled using modified design of old motor housing, without wheels"
        }
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={esp32rovertest}
        alt={"Test of electronics in rover"}
        title={"Test of electronics in rover"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={esp32wiring}
        alt={"Close up picture of wiring on ESP32"}
        title={"Close up picture of wiring on ESP32"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={oldorverassembled}
        alt={
          "Rover assembled using modified design of old motor housing, with wheels and cover"
        }
        title={
          "Rover assembled using modified design of old motor housing, with wheels and cover"
        }
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={roverbin}
        alt={"Rover testing in the bin"}
        title={"Rover testing in the bin"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={exolithtestpc}
        alt={"Exolith IPcam of rover in bin"}
        title={"Exolith IPcam of rover in bin"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={explodedv1}
        alt={"Exploded view of v1 of the new gearbox"}
        title={"Exploded view of v1 of the new gearbox"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={v1open}
        alt={"V1 of new gearbox printed on rover"}
        title={"V1 of new gearbox printed on rover"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={v1onrovernowheels}
        alt={"Assmebled rover with V1 of new gearbox, no wheels"}
        title={"Assmebled rover with V1 of new gearbox, no wheels"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={v1onrover}
        alt={"Assmebled rover with V1 of new gearbox"}
        title={"Assmebled rover with V1 of new gearbox"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={v1implemented}
        alt={"Close up of V1 of new gearbox on assembled rover"}
        title={"Close up of V1 of new gearbox on assembled rover"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={roverandlaptop}
        alt={
          "Top down view of rover with V1 of new gearbox and laptop for testing"
        }
        title={
          "Top down view of rover with V1 of new gearbox and laptop for testing"
        }
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={explodedv2}
        alt={"Exploded view of V2 of the new gearbox"}
        title={"Exploded view of V2 of the new gearbox"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={PCBscreenshot}
        alt={"PCB wiring screenshot"}
        title={"PCB wiring screenshot"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={boardplain}
        alt={"PCB board soldered"}
        title={"PCB board soldered"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={boardwired}
        alt={"PCB board soldered and wired"}
        title={"PCB board soldered and wired"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={boardtogether}
        alt={"PCB board installed"}
        title={"PCB board installed"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={pcbv2}
        alt={"Second iteration of the PCB"}
        title={"PCB board v2"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={completerassorv2}
        alt={"V2 of completed rover"}
        title={"Rover with PCB board v2"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={electronicswiringv2}
        alt={"High level electronics wiring, much cleaner"}
        title={"Close up of wiring on rover with PCB board v2"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={rovers3}
        alt={"Third iteration of the PCB"}
        title={"PCB board v3 before soldering"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
      <img
        src={pcbv3}
        alt={"Three fully assembled rovers"}
        title={"Three fully assembled rovers with v3 PCB"}
        style={{ width: "400px", height: "auto", marginBottom: "1rem" }}
      />
    </>
  );
}

export default Media;
