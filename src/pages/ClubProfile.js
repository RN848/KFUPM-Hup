// ClubProfile.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getClubById } from "../api/apiClubService"; // Adjust the path as needed
import {followClub, unfollowClub, getJoinedEvents, leaveEvent, joinEvent} from "../api/apiUserService"; // Adjust imports as needed
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_clubProfile.scss";
import defaultImg from "../public/images/activities/activity-01.png"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

const ClubProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
          console.log("Fetching data for clubId:", clubId);
          const club = await getClubById(clubId); // Fetch club data by ID
          console.log("Club data received:", club);

          if (!club) {
            throw new Error("Club not found");
          }

          setClubData({
            name: club.name,
            clubPicture: club.clubPicture,
            desc: club.description,
          });

          // Assuming club.events contains activity details
          setClubActivities(club.events || []);
          setIsFollowing(club.isFollowing || false); // Adjust based on your API response

          // Fetch user's joined events
          const joinedEventsResponse = await getJoinedEvents();
          const joinedEventIds = joinedEventsResponse.data.map(event => event._id);
          setJoinedActivities(joinedEventIds);
          console.log("Joined Event IDs:", joinedEventIds);
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


  const handleJoinClick = async (eventId) => {
    if (joinedActivities.includes(eventId)) {
      // User wants to leave the event
      try {
        await leaveEvent(eventId);
        setJoinedActivities(joinedActivities.filter(id => id !== eventId));
      } catch (error) {
        console.error("Error leaving event:", error);
        // Optionally, display an error message to the user
      }
    } else {
      // User wants to join the event
      try {
        await joinEvent(eventId);
        setJoinedActivities([...joinedActivities, eventId]);
      } catch (error) {
        console.error("Error joining event:", error);
        // Optionally, display an error message to the user
      }
    }
  };




  if (error) {
    return (
        <Body>
          <div className="club-profile-body">
            <Container>
              <Alert variant="danger">{error}</Alert>
              {/* Optionally, add a button to go back */}
              <Button variant="secondary" onClick={() => navigate("/clubs")}>
                Back to Clubs
              </Button>
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
                    src={clubData.clubPicture || "/images/clubs/aniket-gaurav.png"} // Fallback image
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
                  clubActivities.map((activity) => (
                      <Col key={activity._id} xs={12} md={6} className="mb-4">
                        <div className="activity-card">
                          <Image
                              src={activity.img || defaultImg} // Correct fallback
                              className="activity-image"
                              alt={activity.title}
                              onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop if default image also fails
                                e.target.src = "/images/activities/default_activity.png"; // Set fallback image
                              }}
                          />
                          <div className="activity-content">
                            <h3 className="activity-title">{activity.title}</h3>
                            <p className="activity-description">
                              {activity.description}
                            </p>
                            <Button
                                className={`join-btn ${
                                    joinedActivities.includes(activity._id) ? "joined" : ""
                                }`}
                                onClick={() => handleJoinClick(activity._id)}
                            >
                              {joinedActivities.includes(activity._id) ? "Joined" : "Join"}
                            </Button>
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
