import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

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
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            {/* <Nav.Link href="#link">History</Nav.Link> include in about page*/}
            {/* <Nav.Link href="#link">Development</Nav.Link> part of about*/}
            {/* <Nav.Link href="#link">Code</Nav.Link> github button in about section*/}
            <Nav.Link as={Link} to="/resources">
              Resources
            </Nav.Link>
            {/* <Nav.Link href="#link">Notes</Nav.Link> part of assembly instructions*/}
            {/* <Nav.Link href="#link">BOM</Nav.Link> part of assembly instructinos*/}
            <Nav.Link as={Link} to="/media">
              Media
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
