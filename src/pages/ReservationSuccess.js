import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Body from "../components/Body";

import "../styles/main.css";
import "../styles/pages/_reservationSuccess.scss";

const ReservationSuccess = () => {
  const [remainingTime, setRemainingTime] = useState(25200); // Countdown timer (7 hours)
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

  const reservationDetails = {
    sport: "Football",
    field: "Field 1",
    day: "Sunday",
    time: "1:00 - 1:59",
    studentsJoined: 4,
    studentsNeeded: 7,
    timeLeft: "03:58",
    isPublic: true,
    code: "32423",
  };

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
            onClick={() =>
              navigate("/reservation-details", {
                state: {
                  isOwnerView: true,
                  reservation: {
                    sport: "Football",
                    field: "Field 1",
                    day: "Sunday",
                    time: "1:00 - 1:59",
                    studentsNeeded: 7,
                    studentsJoined: 4,
                    timeLeft: "03:58",
                    isPublic: true,
                    code: "32423",
                  },
                },
              })
            }
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
