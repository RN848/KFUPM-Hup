import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_latestNews.scss";
import "../styles/pages/_activityView.scss";
import { Row, Col, Button, Image } from "react-bootstrap";

const ActivityView = () => {
  const navigate = useNavigate();

  // State for Join and Follow buttons
  const [isJoined, setIsJoined] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Activity and Club Data
  const activityData = {
    title: "Basketball Tournament 2024",
    description: "Join us for an exciting basketball event.",
    details:
      "Get ready to hit the court! This tournament is open to all students, regardless of skill level. Teams will compete in a knockout format, with prizes for the top performers. Whether you're a seasoned player or just looking to have fun, this event is a great way to stay active and connect with others.",
    club: {
      name: "Computer Club",
      logo: "../images/clubs/computer_club.png",
    },
    activityImage: "../images/activities/activity-02.jpeg",
  };

  return (
    <Body>
      <div className="activity-view-body">
        {/* Activity Header Section */}
        <div className="news-box p-4">
          {/* Back Button */}
          <div className="d-flex justify-content-end mb-3">
            <Button style={{backgroundColor: "#6c757d", border: "none"}} onClick={() => navigate(-1)} >
              Back
            </Button>
          </div>

          {/* Activity Section */}
          <Row className="activity-section">
            <Col xs={12} md={6}>
              <Image
                src={activityData.activityImage}
                alt={activityData.title}
                className="activity-image"
              />
            </Col>
            <Col xs={12} md={6}>
              <div className="activity-details">
                <h2 className="activity-title">{activityData.title}</h2>
                <h3 className="activity-description">
                  {activityData.description}
                </h3>
                {/* Join Button */}
                <Button
                  className={`news-join-btn ${isJoined ? "joined" : ""}`}
                  onClick={() => setIsJoined(!isJoined)}
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
                  src={activityData.club.logo}
                  alt={activityData.club.name}
                  className="club-logo"
                />
              </Col>
              <Col>
                <div className="club-info">
                  <h4 className="club-name">{activityData.club.name}</h4>
                  <Button
                    className={`club-action-btn ${
                      isFollowing ? "following" : "follow"
                    }`}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Body>
  );
};

export default ActivityView;
