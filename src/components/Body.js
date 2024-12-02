//Body.js
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../styles/master.css";
import "../styles/main.css";
import "../styles/pages/_headbar.scss";
import logo from "../images/KFUPM_HUB.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import Row from "react-bootstrap/Row";

export default function Body({ children }) {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("normal");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    if (storedRole) {
      setUserRole(storedRole.trim());
    }

    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Clear token and role from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    // Set login state to false
    setIsLoggedIn(false);

    // Redirect to login page
    navigate("/Log-In");
  };

  return (
    <Container fluid style={{ height: "100%", width: "100%" }}>
      <Row>
        {/* Navbar */}
        <Navbar expand="md" className="headBar" bg="light" variant="dark" style={{ paddingRight: '1.5rem' }}>
          <Navbar.Brand onClick={() => navigate("/home")} className="logo">
            <Image src={logo} alt="KFUPM HUB Logo" className="kfupm-logo" />
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
                Student Clubs
              </a>

              {userRole === "admin" && (
                <a href="/New-Club" className="headbar-link">
                  Create Club
                </a>
              )}

              {userRole === "clubAccount" && (
                <a href="/clubleaderHomePage" className="headbar-link">
                  Club Page
                </a>
              )}

              {/* Profile Link with Dropdown */}
              <div className="dropdown">
                <a
                  href="#!"
                  className="headbar-link profile-link"
                  onClick={() => {
                    if (userRole !== "clubAccount") {
                      navigate("/Your-Profile");
                    } else {
                      navigate("/manage-profile");
                    }
                  }}
                >
                  Profile
                </a>

                {/* Dropdown Menu */}
                {isLoggedIn && (
                  <div className="dropdown-menu">
                    <a className="dropdown-item" onClick={handleLogout}>Logout</a>
                    {/* You can add more options here (e.g., Settings) */}
                  </div>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      {/* Content Area */}
      <Row style={{ height: "100%" }}>
        <div className="cont" style={{ paddingTop: "1.5rem" }}>{children}</div>
      </Row>
    </Container>
  );
}
