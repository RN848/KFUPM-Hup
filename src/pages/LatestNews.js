import React, { useState, useEffect } from "react";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_latestNews.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image, Button } from "react-bootstrap";
import { getAllEvents } from "../api/apiEventService"; // Importing the event service

const LatestNews = () => {
  const [filter, setFilter] = useState(""); // Filter state
  const [clickedNews, setClickedNews] = useState([]); // Track joined activities
  const [events, setEvents] = useState([]); // Events list
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(null); // Error state

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents(); // Fetch events using the service
        setEvents(data); // Set fetched events to state
      } catch (err) {
        setError("Error fetching events. Please try again.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this effect runs only once, after the component mounts

  const handleJoinClick = (index) => {
    if (!clickedNews.includes(index)) {
      setClickedNews([...clickedNews, index]);
    } else {
      setClickedNews(clickedNews.filter((i) => i !== index)); // Allow toggling
    }
  };

  // Filtered events list
  const filteredNewsList = events.filter((_, index) => {
    if (filter === "following") return index % 2 === 0; // Example: Show every alternate event
    if (filter === "enrolled") return clickedNews.includes(index); // Show joined events
    return true; // Show all if no filter
  });

  const newsMap = filteredNewsList.map((event, index) => (
      <Col key={index} lg={6} md={6} sm={12} xs={12} className="news-col">
        <a href={`/activity-view`} className="news-link">
          <div className="news-card">
            <Image className="news-img" src={event.img} alt={event.title} />
            <div className="news-details">
              <h3 className="news-title">{event.title}</h3>
              <p className="news-desc">{event.desc}</p>
              <Button
                  className={`join-btn ${clickedNews.includes(index) ? "joined" : ""}`}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent link navigation
                    e.stopPropagation(); // Stop the event from propagating to the parent <a>
                    handleJoinClick(index);
                  }}
              >
                {clickedNews.includes(index) ? "Joined" : "Join"}
              </Button>
            </div>
          </div>
        </a>
      </Col>
  ));

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there is an issue
  }

  return (
      <Body>
        <div className="news-page">
          <h1 className="page-title">Latest News and Activities</h1>
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
          <Row className="news-container">{newsMap}</Row>
          {/* Back Button */}
          <Button className="back-btn" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </Body>
  );
};

export default LatestNews;
