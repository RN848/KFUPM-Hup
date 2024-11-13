import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "./Nav.js";
import Navbar from "react-bootstrap/Navbar";
import "../styles/master.css";
import "../styles/main.css";
import "../styles/pages/_headbar.scss";
import logo from "../images/KFUPM_HUB.png"
import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Image} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function Body({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isIndexPage = location.pathname === "/";
  const [userRole, setUserRole] = useState("normal"); // default to normal
  useEffect(() => {
    // Get userRole from local storage on component mount
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);
  const [showNav, setShowNav] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <>
        <Navbar expand="md" className="headBar" bg="light" variant="dark">
          <Container fluid>
            <Navbar.Brand onClick={() => navigate("/home")} className="logo">
              <Image src={logo} alt={"KFUPM HUB Logo"} className={"kfupm-logo"} />
            </Navbar.Brand>
            <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            <Navbar.Collapse
                id="basic-navbar-nav"
                className={isMenuOpen ? "show" : ""}
            >
              <div className="d-flex flex-column flex-md-row align-items-md-center w-100">
                <a href="/Sports-reservation" className="headbar-link">
                  Sport Reservation
                </a>
                <a href="/news-clubs" className="headbar-link">
                  Clubs
                </a>

              {/*
              CODE
              */}

              {/*admin*/}
              {userRole == "admin" && (
                  <>
                    <a href="/New-Club" className="headbar-link">
                      Create Club
                    </a>
                  </>
              )}

              {/*club Account*/}
                  {userRole.trim(" ") == "clubAccount" && (
                      <>
                        <a href="/clubleaderHomePage" className="headbar-link">
                          Club Page
                        </a>
                      </>
                  )}

              {/*Club Page*/}

              {/* Profile Link */}
              <a className="headbar-link profile-link" onClick={() => {navigate("/Your-Profile")}}>
                Profile
              </a>
              {/*{!isIndexPage && (
                  <Button
                      variant="secondary"
                      onClick={() => setShowNav(!showNav)}
                      style={{ marginLeft: "10px" }}
                  >
                    {showNav ? "Hide Nav" : "Show Nav"}
                  </Button>
              )}*/}
            </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

          <Row style={{ height: "100%" }}>
            {/* This is the nav only enable when debug */}
            {!isIndexPage && false  &&showNav && (
                <Col xs="2" className="sidNav" style={{ padding: "0" }}>
                  <Nav />
                </Col>
            )}

            <Col className="cont">
              <Container style={{ paddingTop: "20px" }}>{children}</Container>
            </Col>
          </Row>
      </>
  );
}
