import React from "react";
import Button from "react-bootstrap/Button";
import Body from "../components/Body";
import axios from "axios";
import "../styles/pages/_reservationDetails.scss";
import { useLocation, useNavigate } from "react-router-dom";

const ReservationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOwnerView, reservation } = location.state || {};

  const handleJoinLeave = async () => {
    if (!reservation || !reservation._id) {
      alert("No reservation ID found!");
      return;
    }
    try {
      await axios.post(
        `http://localhost:5000/api/reservationRoute/${reservation._id}/join`,
        { email: "user@example.com" } // Add user email if required by backend
      );
      alert("Joined successfully!");
    } catch (err) {
      console.error("Error joining reservation", err);
      alert("Failed to join the reservation.");
    }
  };

  if (!reservation)
    return (
      <Body>
        <p>Loading...</p>
      </Body>
    );

  const reservationDate = new Date(reservation.date);
  const dayName = reservationDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <Body>
      <div className="reservation-details">
        <h2>Reservation Details</h2>
        <p style={{ color: "white" }}>
          <strong>Participants:</strong> {reservation.participants}
        </p>
        <div className="details-container">
          <h3>{reservation.sport}</h3>
          <div className="details-row">
            <span>
              <strong>Field:</strong> {reservation.field}
            </span>
            <span>
              <strong>Day:</strong> {dayName}
            </span>
            <span>
              <strong>Time:</strong> {reservation.time}
            </span>
          </div>
        </div>
        <div className="details-container">
          <div className="details-row">
            <span>
              <strong>Type:</strong> {reservation.type}
            </span>
            <div className="button-group">
              <div className="code-box">Code : {reservation.code}</div>
              <Button variant="primary">Share</Button>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          {isOwnerView ? (
            <>
              <Button variant="primary">Save</Button>
              <Button variant="danger">Delete</Button>
            </>
          ) : (
            <>
              <Button variant="primary" onClick={handleJoinLeave}>
                Join / Leave
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/Sports-reservation")}
              >
                Back
              </Button>
            </>
          )}
        </div>
      </div>
    </Body>
  );
};

export default ReservationDetails;
