// ClubProfile.js
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_clubProfile.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import { getClubById } from "../api/apiClubService"; // Adjust the path as needed
import {followClub, unfollowClub} from "../api/apiUserService"
const ClubProfile = () => {
  const location = useLocation();
  const { clubId } = location.state || {}; // Extract clubId from navigation state

  const [clubData, setClubData] = useState(null);
  const [clubActivities, setClubActivities] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [joinedActivities, setJoinedActivities] = useState([]);
  const [error, setError] = useState(null); // Error state
  const [message, setMessage] = useState(null); // Success/Error messages

  useEffect(() => {
    if (clubId) {
      const fetchClubData = async () => {
        try {
          console.log(clubId)
          const response = await getClubById(clubId); // Fetch club data by ID
          const club = response;
          console.log(club)
          setClubData({
            name: club.name,
            clubPicture: club.clubPicture,
            desc: club.description,
          });

          // Assuming club.events contains activity details
          // If not, adjust accordingly to fetch activities
          setClubActivities(club.events || []);
          setIsFollowing(club.isFollowing || false); // Adjust based on your API response
        } catch (err) {
          console.error("Error fetching club data:", err);
          setError("Failed to load club data. Please try again later.");
        }
      };

      fetchClubData();
    } else {
      setError("No club selected.");
    }
  }, [clubId]);

  const handleFollowClick = async () => {
    try {
      if (!isFollowing) {
        await followClub(clubId); // API call to follow the club
        setIsFollowing(true);
        setMessage(`You are now following ${clubData.name}.`);
      } else {
        await unfollowClub(clubId); // API call to unfollow the club
        setIsFollowing(false);
        setMessage(`You have unfollowed ${clubData.name}.`);
      }
    } catch (err) {
      console.error("Error updating follow status:", err);
      setError("Failed to update follow status. Please try again.");
    }

    // Clear messages after 3 seconds
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 3000);
  };

  const handleJoinClick = (index) => {
    if (!joinedActivities.includes(index)) {
      setJoinedActivities([...joinedActivities, index]);
    } else {
      setJoinedActivities(joinedActivities.filter((i) => i !== index));
    }
  };

  if (error) {
    return (
        <Body>
          <div className="club-profile-body">
            <Container>
              <Alert variant="danger">{error}</Alert>
            </Container>
          </div>
        </Body>
    );
  }

  if (!clubData) {
    return (
        <Body>
          <div className="club-profile-body">
            <Container>
              <div>Loading...</div>
            </Container>
          </div>
        </Body>
    );
  }

  return (
      <Body>
        <div className="club-profile-body">
          <Container>
            {/* Club Header Section */}
            <Row className="club-header align-items-center">
              <Col xs={12} md={4} className="text-center">
                <Image
                    src={clubData.clubPicture || "/images/clubs/computer_club.png"} // Fallback image
                    alt={`${clubData.name} Logo`}
                    className="club-logo"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop if default image also fails
                      e.target.src = "/images/clubs/computer_club.png"; // Set fallback image
                    }}
                />
              </Col>
              <Col xs={12} md={8}>
                <div className="club-info">
                  <h1 className="club-name">{clubData.name}</h1>
                  <p className="club-desc">{clubData.desc}</p>
                  <Button
                      className={`club-action-btn ${
                          isFollowing ? "following" : "follow"
                      }`}
                      onClick={handleFollowClick}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  {/* Success or Error Messages */}
                  {message && <Alert variant="success" className="mt-2">{message}</Alert>}
                  {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
                </div>
              </Col>
            </Row>

            {/* Activities Section */}
            <h2 className="section-title mt-5">Upcoming Activities</h2>
            <Row className="activity-section">
              {clubActivities.length > 0 ? (
                  clubActivities.map((activity, index) => (
                      <Col key={index} xs={12} md={6} className="mb-4">
                        <div className="activity-card">
                          <Image
                              src={activity.poster || "/images/activities/default_activity.png"} // Fallback image
                              className="activity-image"
                              alt={activity.name}
                              onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop if default image also fails
                                e.target.src = "/images/activities/default_activity.png"; // Set fallback image
                              }}
                          />
                          <div className="activity-content">
                            <h3 className="activity-title">{activity.name}</h3>
                            <p className="activity-description">
                              {activity.description}
                            </p>
                            <Button
                                className={`join-btn ${
                                    joinedActivities.includes(index) ? "joined" : ""
                                }`}
                                onClick={() => handleJoinClick(index)}
                            >
                              {joinedActivities.includes(index) ? "Joined" : "Join"}
                            </Button>
                            {/* Success Message */}
                            {joinedActivities.includes(index) && (
                                <p className="joined-message">
                                  You have successfully joined this activity!
                                </p>
                            )}
                          </div>
                        </div>
                      </Col>
                  ))
              ) : (
                  <Col>
                    <p>No upcoming activities.</p>
                  </Col>
              )}
            </Row>
          </Container>
        </div>
      </Body>
  );
};

export default ClubProfile;
