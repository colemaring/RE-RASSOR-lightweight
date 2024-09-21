import React from "react";
import MyNavbar from "../components/MyNavbar";
import rover1 from "../assets/fsirover.jpg";

function About() {
  return (
    <>
      <MyNavbar></MyNavbar>
      <div className="about-container">
        <h3>RE-RASSOR</h3>
        <p>
          The original RE-RASSOR (Research and Education – Regolith Advanced
          Surface Systems Operational Robot) project aims to be a research and
          education focused robotic testbed. Many universities across the world
          are expanding on the RE-RASSOR project by developing new software and
          robotic mechanisms to make the RE-RASSOR more capable.
        </p>
        <h3>RE-RASSOR lightweight</h3>
        <p>
          RE-RASSOR lightweight was developed with the goal of simplifying the
          process of 3D-printing, building, and programming the rover.
          Modifications to the original RE-RASSOR CAD files were made to reduce
          the number of parts and the complexity of the designs such that they
          are easier to print and assemble. The software and control system is
          written from the group up with the primary goals of being network
          agnostic and having low latency. Documentation for this verison of the
          RE-RASSOR is written so that it can be followed and understood by
          young learners who don't have much experience with robotics.
        </p>
        <h3>Development Journal</h3>
        <p>
          TODO: Include pictures and descriptions of how things have changed
          over time and my thought process behind making the changes.
        </p>
        {/* <img
          src={rover1}
          alt="RE-RASSOR lightweight"
          style={{
            width: "400px",
            height: "auto",
            display: "block",
            margin: "1rem auto",
          }}
        /> */}
        {/* <p>As of Summer 2024, this was the </p>
        <h3>RE-RASSOR's Goal</h3>
        <p>The ultimate goal for</p> */}
      </div>
    </>
  );
}

export default About;
