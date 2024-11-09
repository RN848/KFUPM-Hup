import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/pages/_clubMembers.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Body from "../components/Body";

const ClubMembers = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Omar Alkhulaif",
      interests: "football, tech",
      role: "vice president",
      profilePicture: "/images/clubMembers/omar.jpeg",
    },
    {
      id: 2,
      name: "Rayan Almalki",
      interests: "art, design",
      role: "member",
      profilePicture: "",
    },
    {
      id: 3,
      name: "Alwaleed Almutairi",
      interests: "badketball",
      role: "member",
      profilePicture: "",
    },
    {
      id: 4,
      name: "Abdulrahamn Alhaidery",
      interests: "volleyball",
      role: "member",
      profilePicture: "",
    },
    {
      id: 5,
      name: "Abdulaziz Alsadrani",
      interests: "programming",
      role: "member",
      profilePicture: "",
    },
    {
      id: 6,
      name: "Mohammed",
      interests: "nothing",
      role: "member",
      profilePicture: "",
    },
    {
      id: 7,
      name: "Mohammed",
      interests: "nothing",
      role: "member",
      profilePicture: "",
    },
    {
      id: 8,
      name: "Mohammed",
      interests: "nothing",
      role: "member",
      profilePicture: "",
    },
    {
      id: 9,
      name: "Mohammed",
      interests: "nothing",
      role: "member",
      profilePicture: "",
    },
    {
      id: 10,
      name: "Mohammed",
      interests: "nothing",
      role: "member",
      profilePicture: "",
    },
    {
      id: 11,
      name: "Mohammed",
      interests: "nothing",
      role: "member",
      profilePicture: "",
    },
    {
      id: 12,
      name: "Mohammed",
      interests: "nothing",
      role: "member",
      profilePicture: "",
    },
  ]);

  const handleRemove = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleRoleChange = (id) => {
    alert(`Change role for member ID: ${id}`);
  };

  const handleAddMember = () => {
    alert("Navigate to Add New Member page.");
  };

  return (
    <Body>
      <div className="club-members">
        <header>
          <h1>Club Members</h1>
          <Button variant="primary" onClick={handleAddMember}>
            Add New Member
          </Button>
        </header>

        <div className="members-grid">
          {members.map((member) => (
            <div className="member-card" key={member.id}>
              {member.profilePicture ? (
                <img
                  src={member.profilePicture}
                  alt={`${member.name}'s profile`}
                  className="profile-picture"
                />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} className="default-icon" />
              )}
              <h3>{member.name}</h3>
              <p>{member.interests}</p>
              <p style={{ color: "white" }}>
                <strong>{member.role}</strong>
              </p>
              <div className="buttons">
                <Button
                  variant="primary"
                  onClick={() => handleRoleChange(member.id)}
                >
                  Role
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleRemove(member.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="secondary" className="back-button">
          Back
        </Button>
      </div>
    </Body>
  );
};

export default ClubMembers;
