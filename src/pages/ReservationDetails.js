import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Body from "../components/Body";
import axios from "axios";
import "../styles/pages/_reservationDetails.scss";
import { useLocation, useNavigate } from "react-router-dom";

const ReservationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOwnerView, reservation: initialReservation } = location.state || {};
  const [participants, setParticipants] = useState(
      initialReservation?.participants || 1
  );
  const handleJoinLeave = async () => {
    if (!initialReservation || !initialReservation._id) {
      alert("No reservation ID found!");
      return;
    }




    try {
     const response= await axios.post(
        `http://localhost:5000/api/reservationRoute/${initialReservation._id}/join`,""
         // Add user email if required by backend
      );
      // Update the participants count dynamically
      if (response.data && response.data.reservation) {
        // Update participants state with the latest count
        setParticipants(response.data.reservation.participants);
        console.log("Updated participants:", response.data.reservation.participants);
      }
      alert("Joined successfully!");
    } catch (err) {
      console.error("Error joining reservation", err);
      alert("Failed to join the reservation.");
    }
  };

  if (!initialReservation)
    return (
      <Body>
        <p>Loading...</p>
      </Body>
    );

  const reservationDate = new Date(initialReservation.date);
  const dayName = reservationDate.toLocaleDateString("en-US", {
    weekday: "long",
  });


  return (
    <Body>
      <div className="reservation-details">
        <h2>Reservation Details</h2>
        <p style={{ color: "white" }}>
          <strong>Participants:</strong> {participants}
        </p>
        <div className="details-container">
          <h3>{initialReservation.sport}</h3>
          <div className="details-row">
            <span>
              <strong>Field:</strong> {initialReservation.field}
            </span>
            <span>
              <strong>Day:</strong> {dayName}
            </span>
            <span>
              <strong>Time:</strong> {initialReservation.time}
            </span>
          </div>
        </div>
        <div className="details-container">
          <div className="details-row">
            <span>
              <strong>Type:</strong> {initialReservation.type}
            </span>
            <div className="button-group">
              <div className="code-box">Code : {initialReservation.code}</div>
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
