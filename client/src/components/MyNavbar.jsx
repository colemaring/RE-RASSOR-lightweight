import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";
import GitHubLight from "../assets/github-mark-white.png";
import GitHubDark from "../assets/github-mark.png";
import { DarkModeContext } from "../context/DarkContext";
import { useContext } from "react";

function MyNavbar() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <Navbar expand="lg" className="bg-body-tertiary no-margin-padding">
      <Container>
        <Navbar.Brand>RE-RASSOR</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Controller
            </Nav.Link>
            <Nav.Link as={Link} to="/graphs">
              Telemetry
            </Nav.Link>
            <Nav.Link as={Link} to="/binstream">
              Bin Stream
            </Nav.Link>
            <Nav.Link as={Link} to="/fpvstream">
              FPV Stream
            </Nav.Link>
            <Nav.Link as={Link} to="/location">
              Location
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/about">
              About
            </Nav.Link> */}
            <Nav.Link as={Link} to="/resources">
              Resources
            </Nav.Link>
            <Nav.Link as={Link} to="/media">
              Media
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <DarkModeToggle />
        <a
          href="https://github.com/colemaring/RE-RASSOR-lightweight"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={darkMode ? GitHubLight : GitHubDark}
            alt="GitHub"
            style={{ marginLeft: "1rem", width: "25px", height: "25px" }}
          />
        </a>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
