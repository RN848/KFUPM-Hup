import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_ClubProfile.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

const ClubProfile = () => {
  const navigate = useNavigate();

  const clubdata = {
    name: "Computer Club",
    logo: "../images/activities/activity-01.jpg",
    desc: "This is the Computer Club, where we focus on enhancing skills and building projects.",
  };

  const clubActivity = {
    name: "Basketball Tournament 2024",
    description: "Join us for an exciting basketball event. Open to all students.",
    details:
      "Get ready to hit the court! This tournament is open to all students, regardless of skill level. Teams will compete in a knockout format, with prizes for the top performers. Whether you're a seasoned player or just looking to have fun, this event is a great way to stay active and connect with others.",
    buttonText: "Join",
  };

  return (
    <Body>
      <div className="club-profile-body">
        <Container>
          {/* Header Section */}
          <Row className="club-header">
            <Col xs={12} md={4}>
              <Image
                src={clubdata.logo}
                className="club-logo"
                alt={`${clubdata.name} logo`}
              />
            </Col>
            <Col xs={12} md={8}>
              <div className="club-info">
                <h1>{clubdata.name}</h1>
                <Button className="follow-btn">Follow</Button>
                <p>{clubdata.desc}</p>
              </div>
            </Col>
          </Row>

          {/* Activity Section */}
          <Row className="activity-card">
            <Col xs={12} md={4}>
              <Image
                src="../images/activities/activity-02.jpg"
                className="activity-image"
                alt={clubActivity.name}
              />
            </Col>
            <Col xs={12} md={8}>
              <div className="activity-details">
                <h2>{clubActivity.name}</h2>
                <h3>{clubActivity.description}</h3>
                <Button className="join-btn">{clubActivity.buttonText}</Button>
                <p>{clubActivity.details}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Body>
  );
};

export default ClubProfile;
