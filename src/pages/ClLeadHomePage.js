import React from "react";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_clLeadHomePage.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ClLeadHomePage = () => {
  const navigate = useNavigate();

  const clubMembers = [
    {
      id: 1,
      name: "Omar Alkhulaif",
      profilePicture: "../images/clubMembers/omar.jpeg",
    },
    {
      id: 2,
      name: "Rayan Almalki",
      profilePicture: "",
    },
    {
      id: 3,
      name: "Ahmed Alsalem",
      profilePicture: "",
    },
  ];

  const clubActivity = [
    {
      AcName: "News Activity 1",
      AcDescription: "News activity description goes here.",
      AcImg: "../images/activities/activity-02.jpeg",
    },
    {
      AcName: "News Activity 2",
      AcDescription: "News activity description goes here.",
      AcImg: "../images/activities/activity-03.jpg",
    },
    {
      AcName: "News Activity 3",
      AcDescription: "News activity description goes here.",
      AcImg: "../images/activities/activity-04.jpg",
    },
    {
      AcName: "News Activity 4",
      AcDescription: "News activity description goes here.",
      AcImg: "../images/activities/activity-01.png",
    },
  ];

  return (
    <Body>
      <div className="body">
        <Row className="ClLeadHomePage">
          {/* Club News and Activity Section */}
          <Col xl={7} lg={8} md={12} className="news-box">
            <h1 className="section-title">Club News and Activity</h1>
            <div className="activity-container">
              {clubActivity.map((activity, index) => (
                <div className="activity-item" key={`activity-${index}`}>
                  <div className="activity-card">
                    <Image
                      src={activity.AcImg}
                      className="activity-img"
                      alt={activity.AcName}
                    />
                    <div className="activity-info">
                      <h3>{activity.AcName}</h3>
                      <p>{activity.AcDescription}</p>
                      <Button variant="dark" className="edit-btn" onClick={() => {navigate('/edit-activity')}}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="activity-buttons d-flex justify-content-center ">
              <Button
                variant="primary"
                className="add-btn"
                onClick={() => navigate("/Create-Activity-news")}
              >
                Add New
              </Button>
            </div>
          </Col>

          {/* Members Section */}
          <Col xl={4} lg={4} md={12} className="members-box">
            <h1 className="section-title">Members</h1>
            <div className="member-container">
              {clubMembers.map((member, index) => (
                <div className="member-item" key={`member-${index}`}>
                  {member.profilePicture ? (
                    <Image
                      src={member.profilePicture}
                      className="member-img"
                      alt={member.name}
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
                        onClick={() => navigate("/member-profile")}
                      >
                        Profile
                      </Button>
                      <Button
                        variant="danger"
                        className="remove-btn"
                        onClick={() => console.log("Remove", member.name)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="member-buttons d-flex justify-content-center">
              <Button variant="primary" className="all-btn" onClick={() => {navigate("/club-members")}}>
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
