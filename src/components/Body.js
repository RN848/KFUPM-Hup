
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "./Nav.js";
import "../styles/master.css";
import "../styles/main.css";
import "../styles/pages/_headbar.scss";
import logo from "../images/KFUPM_HUB.png"
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Image} from "react-bootstrap";

export default function Body({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isIndexPage = location.pathname === "/";


  return (
      <>
        <Container fluid style={{ height: "100%" }}>
          <Row className={"headBar"}>
            <div className="d-flex align-items-center">
              {/* KFUPM HUB Logo */}
              <Image
                  src={logo}
                  alt={"KFUPM HUB Logo"}
                  className={"kfupm-logo"}
              />

              {/* Links */}
              <a href="/Sports-reservation" className="headbar-link">
                Sport Reservation
              </a>
              <a href="/news-clubs" className="headbar-link">
                Clubs
              </a>

              {/* Spacer */}
              <div className="flex-grow-1"></div>

              {/* Profile Link */}
              <a href="/profile" className="headbar-link profile-link">
                Profile
              </a>
            </div>
          </Row>

          <Row style={{ height: "100%" }}>
            {!isIndexPage && (
                <Col xs="2" className="sidNav" style={{ padding: "0" }}>
                  <Nav />
                </Col>
            )}

            <Col className="cont">
              <Container style={{ paddingTop: "20px" }}>{children}</Container>
            </Col>
          </Row>
        </Container>
      </>
  );
}
