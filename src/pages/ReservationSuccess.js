import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Body from "../components/Body";

import "../styles/main.css";
import "../styles/pages/_reservationSuccess.scss";

const ReservationSuccess = () => {
  const [remainingTime, setRemainingTime] = useState(25200); 
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  return (
    <Body>
      <div className="reservation-success">
        <h2>Reserved Successfully</h2>
        <p>Need at least 7 students to confirm</p>
        <p style={{ color: "#6c757d", fontSize: "1rem" }}>
          the reservation will cancel after{" "}
          {`${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
            seconds < 10 ? "0" : ""
          }${seconds}`}
        </p>

        <div className="reservation-details">
          <div className="button-group">
            <Button variant="primary">Share</Button>
            <div className="code-box">Code : 32423</div>
          </div>
          <Button className="details-button">Reservation Details</Button>
        </div>

        <Button
          variant="light"
          className="home-button"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </div>
    </Body>
  );
};

export default ReservationSuccess;
