import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Body from "../components/Body";
import axios from "axios";
import "../styles/pages/_reservationDetails.scss";
import { useLocation, useNavigate } from "react-router-dom";

const ReservationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservation: initialReservation } = location.state || {};

  const [participants, setParticipants] = useState(
    initialReservation?.participants || 1
  );
  const [isOwner, setIsOwner] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId"); // Assume user ID is stored here

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (location.state?.isOwnerView) {
        // If the navigation state indicates owner view, set directly
        setIsOwner(true);
        setLoading(false);
        return;
      }

      try {
        const { data: user } = await axios.get(`/api/users/${userId}`);
        if (initialReservation) {
          // Check if the user is the owner of the reservation
          setIsOwner(
            user.createdReservations.some(
              (reservation) => reservation._id === initialReservation._id
            )
          );

          // Check if the user has already joined the reservation
          setHasJoined(
            user.joinedReservations.some(
              (reservation) => reservation._id === initialReservation._id
            )
          );
        }
      } catch (err) {
        console.error("Error fetching user status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus();
  }, [initialReservation, userId, location.state]);

  const handleJoin = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/reservationRoute/${initialReservation._id}/join`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setHasJoined(true);
      setParticipants(data.reservation.participants);
      alert("Joined successfully!");
    } catch (err) {
      console.error("Error joining reservation:", err);
      alert("Failed to join the reservation.");
    }
  };

  const handleLeave = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/reservationRoute/${initialReservation._id}/leave`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setHasJoined(false);
      setParticipants(data.reservation.participants);
      alert("Left the reservation successfully!");
    } catch (err) {
      console.error("Error leaving reservation:", err);
      alert("Failed to leave the reservation.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/reservationRoute/${initialReservation._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Reservation deleted successfully!");
      navigate("/Sports-reservation");
    } catch (err) {
      console.error("Error deleting reservation:", err);
      alert("Failed to delete the reservation.");
    }
  };

  if (loading) {
    return (
      <Body>
        <p>Loading reservation details...</p>
      </Body>
    );
  }

  if (!initialReservation) {
    return (
      <Body>
        <p>No reservation found.</p>
      </Body>
    );
  }

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
          {isOwner ? (
            <Button variant="danger" onClick={handleDelete}>
              Delete Reservation
            </Button>
          ) : hasJoined ? (
            <Button variant="warning" onClick={handleLeave}>
              Leave Reservation
            </Button>
          ) : (
            <Button variant="primary" onClick={handleJoin}>
              Join Reservation
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={() => navigate("/Sports-reservation")}
          >
            Back
          </Button>
        </div>
      </div>
    </Body>
  );
};

export default ReservationDetails;
