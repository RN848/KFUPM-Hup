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

  const [remainingTime, setRemainingTime] = useState(25200); // 7 hours in seconds
  const [reservationDetails, setReservationDetails] = useState(null);

  useEffect(() => {
    if (!reservationId) return;
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/reservationRoute/${reservationId}`
        );
        setReservationDetails(response.data);
      } catch (err) {
        console.error("Error fetching reservation details", err);
      }
    };
    fetchDetails();
  }, [reservationId]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  if (!reservationId)
    return (
      <Body>
        <p>No reservation ID provided.</p>
      </Body>
    );
  if (!reservationDetails)
    return (
      <Body>
        <p>Loading reservation details...</p>
      </Body>
    );

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  return (
      <Body>
        <div className="reservation-container">
          <div className="reservation-success">
            <h2>Reservation Successfully</h2>
            <p>
              <strong>Participants:</strong> {reservationDetails.participants}
            </p>
            <div className="details-container">
              <h3>Sport Name</h3>
              <div className="details-row">
                <p style={{ fontSize: "1rem" }}>
                  The reservation will cancel after
                  <strong>
                    {" "}
                    {`${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
                        seconds < 10 ? "0" : ""
                    }${seconds}`}
                  </strong>
                </p>
              </div>
            </div>
            <div className="details-container">
              <div className="details-row">

                <div className="button-group">
                  <div className="code-box">Code : {reservationDetails.code}</div>

                  <Button variant="primary">Share</Button>
                  <Button
                      variant="light"
                      className="home-button"
                      onClick={() => navigate("/home")}
                  >
                    Home
                  </Button>
                  <Button
                      className="details-button"
                      onClick={() =>
                          navigate("/reservation-details", {
                            state: { isOwnerView: true, reservation: reservationDetails },
                          })
                      }
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Body>
  );


};

export default ReservationSuccess;
