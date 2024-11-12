import React, { useState } from "react";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_clubProfile.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const ClubProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [joinedActivities, setJoinedActivities] = useState([]);

  const clubdata = {
    name: "Computer Club",
    logo: "../images/clubs/computer_club.png",
    desc: "This is the Computer Club, where we focus on enhancing skills and building projects.",
  };

  const clubActivities = [
    {
      name: "Basketball Tournament 2024",
      description:
        "Join us for an exciting basketball event. Open to all students.",
      details:
        "Get ready to hit the court! This tournament is open to all students, regardless of skill level. Teams will compete in a knockout format, with prizes for the top performers. Whether you're a seasoned player or just looking to have fun, this event is a great way to stay active and connect with others.",
      poster: "../images/activities/activity-02.jpeg",
    },
    {
      name: "Coding Workshop",
      description:
        "Learn advanced coding techniques in this exciting workshop.",
      details:
        "Join our coding workshop to improve your skills in web and software development. This event is suitable for both beginners and advanced coders. You'll work on real-world projects and collaborate with fellow students.",
      poster: "../images/activities/activity-03.jpg",
    },
  ];

  const handleJoinClick = (index) => {
    if (!joinedActivities.includes(index)) {
      setJoinedActivities([...joinedActivities, index]);
    } else {
      setJoinedActivities(joinedActivities.filter((i) => i !== index));
    }
  };

  return (
    <Body>
      <div className="club-profile-body">
        <Container>
          {/* Club Header Section */}
          <Row className="club-header align-items-center">
            <Col xs={12} md={4} className="text-center">
              <Image
                src={clubdata.logo}
                className="club-logo"
                alt={`${clubdata.name} logo`}
              />
            </Col>
            <Col xs={12} md={8}>
              <div className="club-info">
                <h1 className="club-name">{clubdata.name}</h1>
                <p className="club-desc">{clubdata.desc}</p>
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

          {/* Activities Section */}
          <h2 className="section-title mt-5">Upcoming Activities</h2>
          <Row className="activity-section">
            {clubActivities.map((activity, index) => (
              <Col key={index} xs={12} md={6} className="mb-4">
                <div className="activity-card">
                  <Image
                    src={activity.poster}
                    className="activity-image"
                    alt={activity.name}
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
            ))}
          </Row>
        </Container>
      </div>
    </Body>
  );
};

export default ClubProfile;
