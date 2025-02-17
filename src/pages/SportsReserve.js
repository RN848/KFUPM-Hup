import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_sportsReserve.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Basketball from "../images/sports/basketball.jpg";
import Football from "../images/sports/football.jpg";
import Tennis from "../images/sports/tennis.jpg";
import Volleyball from "../images/sports/volleyball.jpg";
import Squash from "../images/sports/sqush.jpeg";
import Badminton from "../images/sports/badminton.jpg";

const SportsReserve = () => {
  const [sport, setSport] = useState({ filter: "" });
  const [backendReservations, setBackendReservations] = useState([]);
  const [inputs, setInputs] = useState({ code: "" });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const sportsList = [
    { name: "Basketball", image: Basketball },
    { name: "Football", image: Football },
    { name: "Tennis", image: Tennis },
    { name: "Volleyball", image: Volleyball },
    { name: "Squash", image: Squash },
    { name: "Badminton", image: Badminton },
  ];
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/reservationRoute?${sport.filter ? `sport=${sport.filter}` : ""
          }`
        );
        setBackendReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchData();
  }, [sport]);

  const validateCodeAndNavigate = async (code) => {
    if (!code) {
      setErrorMessage("Please enter a reservation code.");
      return;
    }
    try {
      const response = await axios.get(
        `${apiUrl}/api/reservationRoute/code/${code}`
      );
      if (response) {
        navigate("/reservation-details", {
          state: { isOwnerView: false, reservation: response.data },
        });
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setErrorMessage("No reservation exists with the provided code.");
      } else if (error.response?.status === 500) {
        setErrorMessage("A server error occurred. Please try again later.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleCodeSubmit = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/reservationRoute/code/${inputs.code}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data) {
        navigate("/reservation-details", {
          state: {
            reservationId: response.data._id,
            reservation: response.data,
          },
        });
      } else {
        alert("Reservation not found.");
      }
    } catch (error) {
      console.error("Error fetching reservation by code:", error);
      alert("Failed to find reservation.");
    }
  };

  return (
    <Body>
      <div className="news-page">
        <h1 className="page-title">Sport Reservation</h1>

        {/* Reservation Form Container: New Reservation button and Enter Code field */}
        <div className="reservation-form">
          <Button
            className="inputs-btn"
            as="input"
            type="button"
            value="New Reservation"
            onClick={() => navigate("/new-reservation")}
          />
          <div className="code-field">
            <label htmlFor="codeInput">Enter Code:</label>
            <input
              id="codeInput"
              type="text"
              value={inputs.code}
              onChange={(e) => {
                setInputs((prev) => ({ ...prev, code: e.target.value }));
                setErrorMessage("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  validateCodeAndNavigate(inputs.code);
                }
              }}
              className="code-input"
            />
            {errorMessage && <p style={{ color: "red", margin: 0 }}>{errorMessage}</p>}
          </div>
        </div>

        {/* Sports Filter Buttons */}
        <div className="news-filter" style={{ marginBottom: "20px" }}>
          {sportsList.map((s) => (
            <Button
              key={s.name}
              className={`filter-btn ${sport.filter === s.name ? "active" : ""}`}
              onClick={() =>
                setSport({ filter: sport.filter === s.name ? "" : s.name })
              }
            >
              <span>{s.name}</span>
            </Button>
          ))}
        </div>

        {/* Container Box for All Sports Cards */}
        <div className="news-box">
          <Row className="news-container">
            {backendReservations.length > 0 ? (
              backendReservations.map((reservation, index) => {
                const reservationDate = new Date(reservation.date);
                const displayDay = reservationDate.toLocaleDateString("en-US", {
                  weekday: "long",
                });
                const displayDate = reservationDate.toLocaleDateString("en-US");
                return (
                  <Col
                    key={reservation._id || index}
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                    className="news-col"
                  >
                    <div
                      className="news-card"
                      style={{ cursor: "pointer", position: "relative" }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/reservation-details", {
                          state: {
                            reservationId: reservation._id,
                            reservation: {
                              ...reservation,
                              day: `${displayDay}, ${displayDate}`,
                            },
                          },
                        });
                      }}
                    >
                      <Image
                        className="news-img"
                        src={
                          sportsList.find((s) => s.name === reservation.sport)
                            ?.image || "/images/default-sport.jpg"
                        }
                        alt={reservation.sport}
                        fluid
                      />
                      <div className="news-details">
                        <h3 className="news-title">{reservation.sport}</h3>
                        <div className="reservation-details">
                          <p className="news-desc">Field: {reservation.field}</p>
                          <p className="news-desc">
                            Date: {displayDay}, {displayDate}
                          </p>
                          <p className="news-desc">Time: {reservation.time}</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            ) : (
              <Col>
                <p style={{ color: "white" }}>No reservations to display.</p>
              </Col>
            )}
          </Row>
        </div>

        {/* Back Button */}
        <div className="d-flex justify-content-center mt-4">
          <Button className="back-btn" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>
    </Body>
  );
};

export default SportsReserve;
