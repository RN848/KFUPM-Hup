import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Basketball from "../images/sports/sport-1.jpg";
import Football from "../images/sports/sport-2.jpg";
import Tennis from "../images/sports/sport-3.jpg";
import Volleyball from "../images/sports/sport-4.jpg";
import Squash from "../images/sports/sport-5.jpg";
import Badminton from "../images/sports/sport-6.jpg";

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
          `${apiUrl}/reservationRoute?${sport.filter ? `sport=${sport.filter}` : ""
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
      // Make an API call to validate the code
      const response = await axios.get(
        `${apiUrl}/reservationRoute/code/${code}`
      );

      // If valid, navigate to the reservation details page
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
        `${apiUrl}/reservationRoute/code/${inputs.code}`,
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

  const sportsMap = sportsList.map((s) => {
    const isActive = sport.filter === s.name;
    return (
      <div className={isActive ? "focus" : ""} key={s.name}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSport({ filter: s.name });
          }}
        >
          <Image className="img" src={s.image} alt={s.name}></Image>
        </a>
        <span>{s.name}</span>
      </div>
    );
  });

  const reservationMap = backendReservations.map((reservation, index) => {
    const reservationDate = new Date(reservation.date);
    const displayDay = reservationDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const displayDate = reservationDate.toLocaleDateString("en-US");

    return (
      <Col
        lg={4}
        md={4}
        sm={6}
        xs={12}
        className="sport-col"
        key={reservation._id || index}
      >
        <a
          href="#"
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
          <div className="reservation-card">
            <h3 className="sport-title">{reservation.sport}</h3>
            <div
              className="reservation-details"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                gap: "30px",
              }}
            >
              <p>Field: {reservation.field}</p>
              <p>
                Date: {displayDay}, {displayDate}
              </p>
              <p>Time: {reservation.time}</p>
            </div>
          </div>
        </a>
      </Col>
    );
  });

  return (
    <Body>
      <div className="body">
        <h1>Sport Reservation</h1>
        <Row
          className={"g-4 wid-row reverse"}
          style={{ marginBottom: "1.5em" }}
        >
          <Col lg={8} md={8} sm={12}>
            <div className={"wid-colum sports"}>{sportsMap}</div>
          </Col>
          <Col>
            <div className="wid-colum">
              <div
                className="form"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <label htmlFor="codeInput" style={{ marginBottom: "0" }}>
                    Enter Code:
                  </label>
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
                    style={{
                      backgroundColor: "lightgray",
                      color: "black",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}
                </div>
                <Button
                  className="inputs-btn"
                  as="input"
                  type="button"
                  value="New Reservation"
                  onClick={() => navigate("/new-reservation")}
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row className={"g-4 wid-row sports-box"}>{reservationMap}</Row>
      </div>
    </Body>
  );
};

export default SportsReserve;
