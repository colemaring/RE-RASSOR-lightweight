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
    </>
  );
}

export default Media;
