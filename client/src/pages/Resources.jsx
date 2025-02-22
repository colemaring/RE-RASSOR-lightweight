import React from "react";
import MyNavbar from "../components/MyNavbar";
import { Link } from "react-router-dom";

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
        RE-RASSOR Links
      </h3>
      <a
        href="https://docs.google.com/document/d/1AeGxqEQWhP8_XDPpjoR6U5f-afnMtCq_Ek1jETLCfaA/export?format=pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginBottom: "0.2rem" }}
      >
        Assembly & BOM
      </a>
      <a
        href="https://github.com/colemaring/RE-RASSOR-lightweight"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginBottom: "0.2rem" }}
      >
        Github Repository
      </a>

      <Link to="/media" style={{ display: "block", marginBottom: "0.2rem" }}>
        Media
      </Link>
      <h3
        style={{
          display: "block",
          marginTop: "2rem",
          marginBottom: "0.3rem",
        }}
      >
        My links
      </h3>
      <a
        href="https://coltonmaring.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginBottom: "0.2rem" }}
      >
        My portfolio
      </a>
    </>
  );
}

export default Resources;
