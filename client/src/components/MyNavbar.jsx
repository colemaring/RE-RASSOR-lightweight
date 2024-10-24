import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";

function MyNavbar() {
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
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/resources">
              Resources
            </Nav.Link>
            <Nav.Link as={Link} to="/media">
              Media
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <DarkModeToggle />
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
