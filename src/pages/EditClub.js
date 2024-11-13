import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Body from "../components/Body";
import "../styles/pages/_editClub.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const EditClub = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { club } = location.state || {};

  // Default club dataa
  const [clubName, setClubName] = useState(club?.name || "Unknown Club");
  const [leader, setLeader] = useState(club?.leader || "");
  const [description, setDescription] = useState(
    club?.description ||
      "A student-led organization focused on promoting environmental awareness and sustainability through activities, workshops, and community projects."
  );
  const [members, setMembers] = useState(club?.members || []);

  const handleUpdateClub = () => {
    alert(`Club Name Updated to: ${clubName}`);
  };

  const handleAssignLeader = () => {
    alert(`Leader Assigned: ${leader}`);
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <Body>
      <div className="edit-club">
        <div className="club-details">
          <img
            // Put the defult logo now the computer club and will change it later
            src={club?.logo || "/images/clubs/computer_club.png"}
            alt={`${clubName} Logo`}
            className="club-logo"
          />
          <h2>{clubName}</h2>
          <p>{description}</p>
          <div className="contact-info">
            {club?.email && (
              <div>
                <strong>Email:</strong> {club.email}
              </div>
            )}
            {club?.number && (
              <div>
                <strong>Number:</strong> {club.number}
              </div>
            )}
            {club?.social && (
              <div>
                <strong>Social:</strong> {club.social}
              </div>
            )}
          </div>
        </div>

        <div className="edit-section">
          <h3>Club Name</h3>
          <div className="form-group">
            <input
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="Club Name"
            />
            <Button onClick={handleUpdateClub}>Update</Button>
          </div>

          <h3>Leader</h3>
          <div className="form-group">
            <input
              type="text"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              placeholder="User ID"
            />
            <Button onClick={handleAssignLeader}>Assign</Button>
          </div>

          <h3>Members</h3>
          <div className="members-list">
            {members.length > 0 ? (
              members.map((member) => (
                <div key={member.id} className="member-card">
                  {member.profilePicture ? (
                    <img
                      src={member.profilePicture}
                      alt={`${member.name}'s profile`}
                      className="profile-picture"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className="default-icon"
                    />
                  )}
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <p className="role">{member.role}</p>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <p style={{ color: "#ccc" }}>No members assigned yet.</p>
            )}
          </div>
        </div>
      </div>

      <Button
        variant="secondary"
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </Body>
  );
};

export default EditClub;
