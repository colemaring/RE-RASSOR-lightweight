import React from "react";
import MyNavbar from "../components/MyNavbar";

function Resources() {
  return (
    <>
      <MyNavbar></MyNavbar>
      <h3
        style={{
          display: "block",
          marginTop: "2rem",
          marginBottom: "0.3rem",
        }}
      >
        My stuff
      </h3>
      <a
        href="https://github.com/colemaring/RE-RASSOR-lightweight"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginBottom: "0.2rem" }}
      >
        Github
      </a>
      <a
        href="https://docs.google.com/presentation/d/1bT2AEzoutYCk4yY9OqZmACdpAPInkWr6kpimgG5G9Ok/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginBottom: "0.2rem" }}
      >
        Presentation
      </a>
      <a
        href="https://drive.google.com/drive/folders/1xFWGFmJ8TMMziFp8QMRdEFUxEIHuI4tB"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginBottom: "0.2rem" }}
      >
        3D Print Files
      </a>
      <a
        href="https://docs.google.com/document/d/1jhzQ0pJI8P-jmU7yeFxD81gAwapxjM90a2alEfP4OI4/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginBottom: "0.2rem" }}
      >
        Documentation (needs update)
      </a>
      <a
        href="https://docs.google.com/spreadsheets/d/1NXGNP6VN6AUMzi3yI0pYu8AWPift6RHg/edit?gid=405465821#gid=405465821"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginBottom: "0.2rem" }}
      >
        Bill of Materials (needs update)
      </a>
      <a
        href="https://coltonmaring.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginBottom: "0.2rem" }}
      >
        My portfolio
      </a>
      <h3
        style={{
          display: "block",
          marginTop: "2rem",
          marginBottom: "0.3rem",
        }}
      >
        Tinkercad Links
      </h3>
      <a
        href="https://www.tinkercad.com/things/gu7IagF82qz-modified-cycloidal?sharecode=EaVgwKvzU-HyPk36FN7cERbTUvtTY_b2djwKR1AdhNg"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginBottom: "0.2rem" }}
      >
        Modified FSI Cycloidal Drive
      </a>
      <a
        href="https://www.tinkercad.com/things/1p2ggSRB8as-gearbox-v1?sharecode=8IpHNY6IAvpy4pHOyp5e84vmgTq2tT6HnijBi_N8EMI"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginBottom: "0.2rem" }}
      >
        Gearbox V1
      </a>
      <a
        href="https://www.tinkercad.com/things/2ldF289oJCp-gearbox-v2?sharecode=dsHo78Nv-HKhRKtgQijNCOR7xe-CxvZzn5wVtpn9wTg"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginBottom: "0.2rem" }}
      >
        Gearbox V2
      </a>
      <h3
        style={{
          display: "block",
          marginTop: "2rem",
          marginBottom: "0.3rem",
        }}
      >
        Mostly Irrelevant
      </h3>
      <a
        href="https://fsi.ucf.edu/student-design/robotics/re-rassor/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          marginBottom: "0.3rem",
        }}
      >
        FSI's RE-RASSOR page
      </a>
      <a
        href="https://floridaspacegrant.org/program/re-rassor/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          marginBottom: "2rem",
        }}
      >
        Florida Space Grant Consortium's RE-RASSOR page
      </a>
    </>
  );
}

export default Resources;
