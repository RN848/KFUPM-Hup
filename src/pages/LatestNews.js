// LatestNews.js
import React, { useState, useEffect } from "react";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_latestNews.scss";
import { Row, Col, Image, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getAllEvents } from "../api/apiEventService"; // Importing the event service
import { getFollowedClubs, getJoinedEvents, joinEvent, leaveEvent } from "../api/apiUserService"; // Importing join and leave event services

const LatestNews = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [filter, setFilter] = useState(""); // Filter state
  const [enrolledEventIds, setEnrolledEventIds] = useState([]); // Track enrolled activities by event IDs
  const [events, setEvents] = useState([]); // Events list
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(null); // Error state
  const [message, setMessage] = useState(""); // Success/Error messages
  const [followClubs, setFollowClubs] = useState([]); // User's following clubs

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents(); // Fetch events using the service
        setEvents(data); // Set fetched events to state

        const followedClubsResponse = await getFollowedClubs(); // Fetch followed clubs
        const joinedEventsResponse = await getJoinedEvents();

        setFollowClubs(followedClubsResponse); // Assuming response is an array
        setEnrolledEventIds(joinedEventsResponse.data.map((event) => event._id));
      } catch (err) {
        setError("Error fetching events. Please try again.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this effect runs only once, after the component mounts

  // Handler to join or leave an event
  const handleJoinEvent = async (eventId) => {
    if (enrolledEventIds.includes(eventId)) {
      // User wants to leave the event
      try {
        await leaveEvent(eventId);
        setEnrolledEventIds(enrolledEventIds.filter((id) => id !== eventId));
        setMessage("You have left this activity.");
      } catch (err) {
        setError("Failed to leave the activity. Please try again.");
        console.error("Error leaving event:", err);
      }
    } else {
      // User wants to join the event
      try {
        await joinEvent(eventId);
        setEnrolledEventIds([...enrolledEventIds, eventId]);
        setMessage("You have joined this activity!");
      } catch (err) {
        setError("Failed to join the activity. Please try again.");
        console.error("Error joining event:", err);
      }
    }

    // Clear messages after 3 seconds
    setTimeout(() => {
      setMessage("");
      setError(null);
    }, 3000);
  };

  // Filtered events list based on the selected filter
  const filteredNewsList = events.filter((news) => {
    if (filter === "following") {
      // Ensure followClubs and news.createdByClub are defined
      if (!followClubs || !news.createdByClub) return false;
      return followClubs.data.some((club) => {
        console.log(club.name + " OLA " + news.createdByClub.toString());
        console.log(club._id.toString() === news.createdByClub.toString());
        return club._id.toString() === news.createdByClub.toString();
      });
    }
    if (filter === "enrolled") {
      // Show only enrolled events
      return enrolledEventIds.includes(news._id);
    }
    return true; // Default: Show all
  });

  if (loading) {
    return (
        <Body>
          <div className="news-page">
            <div>Loading...</div> {/* Display loading message while fetching data */}
          </div>
        </Body>
    );
  }

  if (error) {
    return (
        <Body>
          <div className="news-page">
            <Alert variant="danger">{error}</Alert> {/* Display error message */}
          </div>
        </Body>
    );
  }

  return (
      <Body>
        <div className="news-page">
          <h1 className="page-title">Latest News and Activities</h1>
          {/* Display success or error messages */}
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          {/* Filter Buttons */}
          <div className="news-filter">
            <Button
                className={`filter-btn ${filter === "following" ? "active" : ""}`}
                onClick={() => setFilter(filter === "following" ? "" : "following")}
            >
              Following
            </Button>
            <Button
                className={`filter-btn ${filter === "enrolled" ? "active" : ""}`}
                onClick={() => setFilter(filter === "enrolled" ? "" : "enrolled")}
            >
              Enrolled
            </Button>
          </div>
          {/* Events Grid */}
          <Row className="news-container">
            {filteredNewsList.length > 0 ? (
                filteredNewsList.map((event) => (
                    <Col
                        key={event._id}
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        className="news-col"
                    >
                      <div
                          className="news-card"
                          style={{ cursor: "pointer", position: "relative" }}
                          onClick={() => {
                            // Navigate to the activity view page using navigate
                            navigate('/activity-view', { state: { eventId: event._id } });
                          }}
                      >
                        <Image
                            className="news-img"
                            src={event.img || "/images/activities/activity-01.png"}
                            alt={event.title || "Activity Image"}
                            fluid
                        />
                        <div className="news-details">
                          <h3 className="news-title">{event.title}</h3>
                          <p className="news-desc">{event.desc}</p>
                          <Button
                              className={`join-btn ${
                                  enrolledEventIds.includes(event._id) ? "joined" : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault(); // Prevent link navigation
                                e.stopPropagation(); // Stop the event from propagating to the parent <div>
                                handleJoinEvent(event._id); // Handle join click
                              }}
                          >
                            {enrolledEventIds.includes(event._id) ? "Joined" : "Join"}
                          </Button>
                        </div>
                      </div>
                    </Col>
                ))
            ) : (
                <Col>
                  <p>No events to display.</p>
                </Col>
            )}
          </Row>
          {/* Back Button */}
          <div className="d-flex justify-content-center mt-4">
            <Button className="back-btn" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </div>
      </Body>
  );
};

export default LatestNews;
