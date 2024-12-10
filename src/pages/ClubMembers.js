// src/pages/ClubMembers.js
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/pages/_clubMembers.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Body from "../components/Body";
import {useLocation, useNavigate} from "react-router-dom";
import {
  fetchClubMembers,
  removeMemberFromClub,
} from "../api/apiClubService";
import {fetchUserProfile} from "../api/apiUserService"; // Import the new API functions

const ClubMembers = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Replace this with the actual club ID. This could come from context, props, or authentication data.
  const location = useLocation();
  const { clubId } = location.state || {};
  // Fetch members from the backend API on component mount
  useEffect(() => {
    const getMembers = async () => {
      try {
        const fetchedMembers = await fetchClubMembers(clubId);
        setMembers(fetchedMembers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError(
            err.message || "Failed to fetch members. Please try again later."
        );
        setLoading(false);
      }
    };

    getMembers();
  }, [clubId]);

  // Handle member removal
  const handleRemove = async (id) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      try {
        await removeMemberFromClub(clubId, id);
        // Update local state after successful deletion
        setMembers(members.filter((member) => member.id !== id));
      } catch (err) {
        console.error(`Error removing member with ID ${id}:`, err);
        alert("Failed to remove member. Please try again.");
      }
    }
  };


  // Handle adding a new member
  const handleAddMember = () => {
    navigate("/add-member"); // Navigate to the Add Member page
  };

  if (loading) {
    return (
        <Body>
          <div className="club-members">
            <h1>Club Members</h1>
            <p>Loading members...</p>
          </div>
        </Body>
    );
  }

  if (error) {
    return (
        <Body>
          <div className="club-members">
            <h1>Club Members</h1>
            <p className="error">{error}</p>
          </div>
        </Body>
    );
  }

  return (
      <Body>
        <div className="club-members">
          <header>
            <h1>Club Members</h1>
            <Button
                variant="primary"
                className="add-member-btn"
                onClick={handleAddMember}
            >
              Add New Member
            </Button>
          </header>

          <div className="members-grid">
            {members.length === 0 ? (
                <p>No members found.</p>
            ) : (
                members.map((memberid) => {
                  const member = fetchUserProfile()
                  return (
                      <div
                          className="member-card"
                          key={member.id} // Ensure 'id' is unique and matches backend data
                          onClick={() =>
                              navigate("/member-profile", {
                                state: {member},
                              })
                          }
                      >
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
                        <h3>{member.name}</h3>
                        <p>{member.interests}</p>
                        <p style={{color: "white"}}>
                          <strong>{member.role}</strong>
                        </p>
                        <Button
                            variant="primary"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the card's onClick
                            }}
                        >
                          Change Role
                        </Button>
                        <Button
                            variant="danger"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the card's onClick
                              handleRemove(member.id);
                            }}
                        >
                          Remove
                        </Button>
                      </div>
                  )
                })
            )}
          </div>

          <Button
              variant="secondary"
              className="back-btn"
              onClick={() => {
                navigate("/clubleaderHomePage");
              }}
          >
            Back
          </Button>
        </div>
      </Body>
  );
};

export default ClubMembers;
