import React from "react";
import Button from "react-bootstrap/Button";
import Body from "../components/Body";
import "../styles/pages/_reservationDetails.scss";
import { useLocation, useNavigate } from "react-router-dom";

const ReservationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isOwnerView, reservation } = location.state || {};

  // Default reservation details if none are provided
  const data = reservation || {
    sport: "Sport Name",
    field: "Field",
    day: "Day",
    time: "Time",
    studentsNeeded: 7,
    studentsJoined: 0,
    timeLeft: "04:00",
    isPublic: false,
    code: "XXXX",
  };

  return (
    <Body>
      <div className="reservation-details">
        <h2>Reservation Details</h2>

        {/* Header Section */}
        <p style={{ color: "white" }}>
          Need at least <strong>{data.studentsNeeded}</strong> students to confirm
        </p>
        <p style={{ color: "#6c757d", fontSize: "1rem" }}>
          The reservation will cancel after <strong>{data.timeLeft}</strong>
        </p>

        {/* Sport Details Section */}
        <div className="details-container">
          <h3>{data.sport}</h3>
          <div className="details-row">
            <span>
              <strong>Field:</strong> {data.field}
            </span>
            <span>
              <strong>Day:</strong> {data.day}
            </span>
            <span>
              <strong>Time:</strong> {data.time}
            </span>
          </div>
        </div>
        {/* Type, Share, and Code Section */}
        <div className="details-container">
          <div className="details-row">
            <span>
              <strong>Type:</strong> {data.isPublic ? "Public" : "Private"}
            </span>
            <div className="button-group">
            <div className="code-box">Code : {data.code}</div>
              <Button variant="primary">Share</Button>
              
            </div>
          </div>
        </div>

        {/* Students Joined Section */}
        <p className="students-joined">{data.studentsJoined} students joined</p>

        {/* Action Buttons */}
        <div className="action-buttons">
          {isOwnerView ? (
            <>
              <Button variant="primary">Save</Button>
              <Button variant="danger">Delete</Button>
            </>
          ) : (
            <>
              <Button variant="primary">Join / Leave</Button>
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
