import React, { useState, useEffect } from "react";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_clLeadHomePage.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Image, Spinner, Alert } from "react-bootstrap"; // Import Spinner and Alert
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  getAllClubs,
  fetchClubMembers,
  fetchClubActivities,
  removeMemberFromClub,
} from "../api/apiClubService";
import { fetchUserProfile } from "../api/apiUserService"; // Import API functions

const ClLeadHomePage = () => {
  const navigate = useNavigate();

  const [clubId, setClubId] = useState(null); // State to store the current club's ID
  const [clubMembers, setClubMembers] = useState([]);
  const [clubActivities, setClubActivities] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [errorMembers, setErrorMembers] = useState(null);
  const [errorActivities, setErrorActivities] = useState(null);
  const [success, setSuccess] = useState(null); // For any success messages

  // Fetch clubId based on user profile
  useEffect(() => {
    const getClubId = async () => {
      try {
        // Fetch all clubs
        const clubs = await getAllClubs();
        // Fetch the user's profile
        const userId = await fetchUserProfile();
        console.log(userId);

        // Find the club where the clubAccount matches the user's ID
        const club = clubs.find((cl) => {
          console.log(cl.clubAccount + " " + userId.data.ID);
          if (cl.clubAccount) {
            return cl.clubAccount === userId.data.ID; // Use the correct ID to match
          } else {
            return false;
          }
        });

        if (club) {
          // If a club is found, set the clubId
          setClubId(club._id);
        } else {
          // If no club is found, set the error message
          setErrorActivities("No clubs found.");
        }
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setErrorActivities("Failed to fetch clubs.");
      }
    };

    getClubId();
  }, []);

  // Fetch club members when clubId changes
  useEffect(() => {
    if (!clubId) return;

    const getClubMembers = async () => {
      try {
        const members = await fetchClubMembers(clubId);
        console.log(members);
        setClubMembers(members);
      } catch (error) {
        setErrorMembers(
            error.message || "Failed to fetch club members. Please try again."
        );
      } finally {
        setLoadingMembers(false);
      }
    };

    getClubMembers();
  }, [clubId]);

  // Fetch club activities when clubId changes
  useEffect(() => {
    if (!clubId) return;

    const getClubActivities = async () => {
      try {
        const activities = await fetchClubActivities(clubId);
        setClubActivities(activities);
      } catch (error) {
        setErrorActivities(
            error.message || "Failed to fetch club activities. Please try again."
        );
      } finally {
        setLoadingActivities(false);
      }
    };

    getClubActivities();
  }, [clubId]);

  // Handler to remove a member (frontend only for now)
  const handleRemove = (id) => {
    setClubMembers(clubMembers.filter((member) => member._id !== id)); // Ensure to use _id
    // Optionally, make an API call to remove the member from the backend
  };

  return (
      <Body>
        <div className="body">
          <Row className="ClLeadHomePage">
            {/* Club News and Activity Section */}
            <Col xl={7} lg={8} md={12} className="news-box">
              <h1 className="section-title">Club News and Activity</h1>

              {/* Error Message for Activities */}
              {errorActivities && <Alert variant="danger">{errorActivities}</Alert>}

              {/* Loading Spinner for Activities */}
              {loadingActivities ? (
                  <div className="text-center my-4">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading activities...</span>
                    </Spinner>
                  </div>
              ) : (
                  <div className="activity-container">
                    {clubActivities.length > 0 ? (
                        clubActivities.map((activity, index) => (
                            <div className="activity-item" key={`activity-${index}`}>
                              <div className="activity-card">
                                <Image
                                    src={activity.AcImg}
                                    className="activity-img"
                                    alt={activity.AcName}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                          "/images/activities/default_activity.png"; // Fallback image
                                    }}
                                />
                                <div className="activity-info">
                                  <h3>{activity.AcName}</h3>
                                  <p>{activity.AcDescription}</p>
                                  <Button
                                      variant="dark"
                                      className="edit-btn"
                                      onClick={() => {
                                        navigate("/edit-activity", {
                                          state: { activityId: activity._id },
                                        });
                                      }}
                                  >
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-activities">No activities found.</p>
                    )}
                  </div>
              )}

              <div className="activity-buttons d-flex justify-content-center">
                <Button
                    variant="primary"
                    className="add-btn"
                    onClick={() => {
                      localStorage.removeItem("fromEdit");
                      navigate("/Create-Activity-news");
                    }}
                >
                  Add New
                </Button>
              </div>
            </Col>

            {/* Members Section */}
            <Col xl={4} lg={4} md={12} className="members-box">
              <h1 className="section-title">Members</h1>

              {/* Error Message for Members */}
              {errorMembers && <Alert variant="danger">{errorMembers}</Alert>}

              {/* Loading Spinner for Members */}
              {loadingMembers ? (
                  <div className="text-center my-4">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading members...</span>
                    </Spinner>
                  </div>
              ) : (
                  <div className="member-container">
                    {clubMembers.length > 0 ? (
                        clubMembers.map((member, index) => (
                            <div className="member-item" key={`member-${index}`}>
                              {member.profilePicture ? (
                                  <Image
                                      src={member.profilePicture}
                                      className="member-img"
                                      alt={member.name}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "/images/clubMembers/default_member.png"; // Fallback image
                                      }}
                                  />
                              ) : (
                                  <FontAwesomeIcon
                                      icon={faUserCircle}
                                      className="default-icon member-img"
                                  />
                              )}

                              <div className="member-info">
                                <h4>{member.name}</h4>
                                <div className="member-actions">
                                  <Button
                                      variant="primary"
                                      className="profile-btn"
                                      onClick={() =>
                                          navigate("/member-profile", {
                                            state: { memberId: member._id }, // Use _id for member
                                          })
                                      }
                                  >
                                    Profile
                                  </Button>
                                  <Button
                                      variant="danger"
                                      className="remove-btn"
                                      onClick={() => handleRemove(member._id)} // Use _id for member
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-members">No members found.</p>
                    )}
                  </div>
              )}

              <div className="member-buttons d-flex justify-content-center">
                <Button
                    variant="primary"
                    className="all-btn"
                    onClick={() => {
                      navigate("/club-members", { state: { clubId: clubId } });
                    }}
                >
                  More
                </Button>
              </div>
            </Col>
          </Row>

          {/* Manage Profile Section */}
          <div className="manage-profile mt-4 text-center">
            <Button
                variant="light"
                className="manage-profile-btn"
                onClick={() => navigate("/edit-club")}
            >
              Manage Club Profile
            </Button>
          </div>
        </div>
      </Body>
  );
};

export default ClLeadHomePage;
