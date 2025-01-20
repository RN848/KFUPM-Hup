import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Body from "../components/Body";
import axios from "axios";

import "../styles/main.css";
import "../styles/pages/_reservationSuccess.scss";

const ReservationSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { reservationId } = state || {};

  const [remainingTime, setRemainingTime] = useState(25200); // Countdown timer (7 hours)
  const [reservationDetails, setReservationDetails] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch reservation details from backend
  useEffect(() => {
    if (!reservationId) return;

    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/reservationRoute/${reservationId}`
        );
        setReservationDetails(response.data);
      } catch (err) {
        console.error("Error fetching reservation details:", err);
      }
    };

    fetchDetails();
  }, [reservationId]);

  // Countdown timer logic
  useEffect(() => {
    const countdown = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  if (!reservationId) {
    return (
      <Body>
        <p>No reservation ID provided.</p>
      </Body>
    );
  }

  if (!reservationDetails) {
    return (
      <Body>
        <p>Loading reservation details...</p>
      </Body>
    );
  }

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  return (
    <Body>
      <div className="reservation-success">
        <h2>Reserved Successfully</h2>
        <p>
          Need at least <strong>{reservationDetails.studentsNeeded}</strong>{" "}
          students to confirm
        </p>
        <p style={{ color: "#6c757d", fontSize: "1rem" }}>
          The reservation will cancel after
          <strong>
            {" "}
            {`${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
              seconds < 10 ? "0" : ""
            }${seconds}`}
          </strong>
        </p>

        <div className="reservation-details">
          <div className="button-group">
            <Button variant="primary">Share</Button>
            <div className="code-box">Code : {reservationDetails.code}</div>
          </div>
          <Button
            className="details-button"
            onClick={() => {
              navigate("/reservation-details", {
                state: {
                  isOwnerView: true,
                  reservation: reservationDetails,
                  reservationId: reservationDetails._id,
                },
              });
            }}
          >
            View Details
          </Button>
        </div>

        <Button
          variant="light"
          className="home-button"
          onClick={() => navigate("/home")}
        >
          Home
        </Button>
      </div>
    </Body>
  );
};

export default ReservationSuccess;
