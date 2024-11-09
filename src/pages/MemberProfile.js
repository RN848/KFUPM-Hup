import React from "react";
import Button from "react-bootstrap/Button";
import "../styles/pages/_memberProfile.scss";
import Body from "../components/Body";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const MemberProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { member } = location.state || {};

  // Default member data if no state is passed
  const data = member || {
    name: "Unknown Member",
    interests: "N/A",
    role: "N/A",
    profilePicture: "",
    isMember: false,
    email: null,
    number: null,
    social: null,
  };

  return (
    <Body>
      <div className="member-profile">
        <div className="profile-card">
          <h2>Member Profile</h2>
          {data.profilePicture ? (
            <img
              src={data.profilePicture}
              alt={`${data.name}'s profile`}
              className="profile-picture"
            />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} className="default-icon" />
          )}
          <h3>{data.name}</h3>
          <p>{data.interests}</p>
          <hr />
          <p className="role">{data.role}</p>
          <div className="buttons">
            <Button variant="primary">Change Role</Button>
            {data.isMember ? (
              <Button variant="danger">Remove</Button>
            ) : (
              <Button variant="success">Add</Button>
            )}
          </div>
          <div className="details">
            {data.email && (
              <p>
                <strong>Email:</strong> {data.email}
              </p>
            )}
            {data.number && (
              <p>
                <strong>Number:</strong> {data.number}
              </p>
            )}
            {data.social && (
              <p>
                <strong>Social:</strong> {data.social}
              </p>
            )}
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="back-button"
        >
          Back
        </Button>
      </div>
    </Body>
  );
};

export default MemberProfile;
