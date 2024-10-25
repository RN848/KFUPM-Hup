import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "./Nav.js";
import "../styles/master.css";
import "../styles/main.css";

import React, { useState } from "react";

export default function Body({ children }) {
  return (
    <>
      <Container fluid style={{ height: "100%" }}>
        {/*  */}

        <Row style={{ height: "100%" }}>
          {/*  */}

          <Col xs="2" className="sidNav" style={{ padding: "0" }}>
            <Nav />
          </Col>

          <Col className="cont">
            <Container style={{ paddingTop: "20px" }}>{children}</Container>
          </Col>

          {/*  */}
        </Row>
      </Container>
    </>
  );
}
