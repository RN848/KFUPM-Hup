// ActivityView.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"; // Import useParams if needed
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_latestNews.scss";
import "../styles/pages/_activityView.scss"; // Ensure this path is correct
import { Row, Col, Button, Image, Alert } from "react-bootstrap";
import { getEventById } from "../api/apiEventService"; // Import getEventById
import {
  joinEvent,
  leaveEvent,
  getJoinedEvents,
  followClub,
  unfollowClub,
  getFollowedClubs,
} from "../api/apiUserService";
import { getClubById } from "../api/apiClubService"; // Import necessary API functions

const ActivityView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = location.state || {}; // Retrieve eventId from navigation state
  // Alternatively, if using URL parameters, uncomment the next line:
  // const { eventId } = useParams();

  const [activityData, setActivityData] = useState(null);
  const [clubData, setClubData] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState(null); // Error state
  const [message, setMessage] = useState(null); // Success/Error messages

  useEffect(() => {
    const fetchActivityDetails = async () => {
      if (!eventId) {
        setError("No activity selected.");
        return;
      }

      try {
        // 1. Fetch event details
        const event = await getEventById(eventId);
        setActivityData(event);

        // 2. Fetch user's joined events to determine if already joined
        const joinedEventsResponse = await getJoinedEvents();
        const joinedEventIds = joinedEventsResponse.data.map((e) => e._id);
        setIsJoined(joinedEventIds.includes(eventId));

        // 3. Fetch user's followed clubs to determine if following the associated club
        // Assuming event has a field 'createdByClub' which is the club's ID
        const followedClubsResponse = await getFollowedClubs();
        const isClubFollowed = followedClubsResponse.data.some(
          (club) => club._id.toString() === event.createdByClub.toString()
        );
        setIsFollowing(isClubFollowed);

        // 4. Optionally, fetch club details if more information is needed
        // For example, if event doesn't contain all club info
        // Uncomment the following lines if necessary:
        /*
        const club = await getClubById(event.createdByClub);
        setClubData(club);
        */
      } catch (err) {
        console.error("Error fetching activity details:", err);
        setError("Failed to load activity details. Please try again later.");
      }
    };

    fetchActivityDetails();
  }, [eventId]);

  // Handler to join or leave the event
  const handleJoinClick = async () => {
    if (!eventId) {
      setError("No activity selected.");
      return;
    }

    try {
      if (!isJoined) {
        // User wants to join the event
        await joinEvent(eventId);
        setIsJoined(true);
        setMessage("You have joined this activity!");
      } else {
        // User wants to leave the event
        await leaveEvent(eventId);
        setIsJoined(false);
        setMessage("You have left this activity.");
      }
    } catch (err) {
      console.error("Error updating join status:", err);
      setError(
        `Failed to ${isJoined ? "leave" : "join"} the activity. Please try again.`
      );
    }

    // Clear messages after 3 seconds
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 3000);
  };

  // Handler to follow or unfollow the club
  const handleFollowClick = async () => {
    if (!activityData || !activityData.createdByClub) {
      setError("No associated club found for this activity.");
      return;
    }

    const clubId = activityData.createdByClub;

    try {
      if (!isFollowing) {
        // User wants to follow the club
        await followClub(clubId);
        setIsFollowing(true);
      } else {
        // User wants to unfollow the club
        await unfollowClub(clubId);
        setIsFollowing(false);
      }
    } catch (err) {
      console.error("Error updating follow status:", err);
      setError(
        `Failed to ${isFollowing ? "unfollow" : "follow"} the club. Please try again.`
      );
    }

    // Clear messages after 3 seconds
  };

  // If there's an error, display it
  if (error) {
    return (
      <Body>
        <div className="activity-view-body">
          <Row className="justify-content-center">
            <Col md={8}>
              <Alert variant="danger">{error}</Alert>
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Col>
          </Row>
        </div>
      </Body>
    );
  }

  // While loading data, display a loading message
  if (!activityData) {
    return (
      <Body>
        <div className="activity-view-body">
          <Row className="justify-content-center">
            <Col md={8}>
              <div>Loading...</div>
            </Col>
          </Row>
        </div>
      </Body>
    );
  }

  return (
    <Body>
      <div className="activity-view-body">
        {/* Back Button */}
        <div className="d-flex justify-content-end mb-3">
          <Button
            style={{ backgroundColor: "#6c757d", border: "none" }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        {/* Activity Header Section */}
        <Row className="activity-section">
          <Col xs={12} md={6}>
            <Image
              src={activityData.img || "/images/activities/activity-02.jpeg"} // Fallback image
              alt={activityData.title}
              className="activity-image rounded-5"
              fluid
            />
          </Col>
          <Col xs={12} md={6}>
            <div className="activity-details">
              <h2 className="activity-title " style={{ color: "white" }}>{activityData.title}</h2>
              <h4 className="activity-description" style={{ color: "wheat" }}>{activityData.description}</h4>
              {/* Join Button */}
              <Button
                className={`news-join-btn ${isJoined ? "joined" : ""}`}
                onClick={handleJoinClick}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
              {isJoined && (
                <p className="joined-message">
                  You have successfully joined this activity!
                </p>
              )}
              <p className="activity-details-text">{activityData.details}</p>
            </div>
          </Col>
        </Row>

        {/* Club Section */}
        <div className="club-section mt-4">
          <Row className="align-items-center">
            <Col xs="auto">
              <Image
                src={activityData.clubLogo || "/images/clubs/computer_club.png"} // Fallback image
                alt={activityData.clubName}
                className="club-logo"
                fluid
              />
            </Col>
            <Col>
              <div className="club-info">
                <h4 className="club-name">{activityData.clubName}</h4>
                <Button
                  className={`club-action-btn ${isFollowing ? "following" : "follow"
                    }`}
                  onClick={handleFollowClick}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Success and Error Messages */}
        {message && (
          <Row className="justify-content-center mt-3">
            <Col md={8}>
              <Alert variant="success">{message}</Alert>
            </Col>
          </Row>
        )}
        {error && (
          <Row className="justify-content-center mt-3">
            <Col md={8}>
              <Alert variant="danger">{error}</Alert>
            </Col>
          </Row>
        )}
      </div>
    </Body>
  );
};

export default ActivityView;
