import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_latestNews.scss";
import "../styles/pages/_newsAndClubs.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image, Button } from "react-bootstrap";

const NewsAndClubs = () => {
  const clubList = [
    {
      title: "Computer Club",
      logo: "../images/clubs/computer_club.png",
      status: "follow",
    },
    {
      title: "First Aid Club",
      logo: "../images/clubs/computer_club.png",
      status: "following",
    },
    {
      title: "Community Club",
      logo: "../images/clubs/computer_club.png",
      status: "follow",
    },
  ];

  const [clickedNews, setClickedNews] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const [clubStatuses, setClubStatuses] = useState(
    clubList.map((club) => club.status)
  );

  const newsList = [
    {
      title: "News Title 1",
      desc: "Description of the news or activity goes here.",
      img: "../images/activities/activity-01.png",
      clup: "1",
    },
    {
      title: "News Title 2",
      desc: "Another news description goes here.",
      img: "../images/activities/activity-02.jpeg",
      clup: "2",
    },
    {
      title: "News Title 3",
      desc: "Details about the third news or activity.",
      img: "../images/activities/activity-03.jpg",
      clup: "3",
    },
    {
      title: "News Title 4",
      desc: "Details about the fourth news or activity.",
      img: "../images/activities/activity-04.jpg",
      clup: "4",
    },
  ];

  const followClups = ["1", "2"];
  const enrolledClups = ["3"];

  // Handle Join/Unjoin News
  const handleJoinClick = (index) => {
    if (!clickedNews.includes(index)) {
      setClickedNews([...clickedNews, index]);
    } else {
      setClickedNews(clickedNews.filter((i) => i !== index)); // Toggle join status
    }
  };

  // Handle Follow/Unfollow Clubs
  const handleFollowClick = (index) => {
    const updatedStatuses = [...clubStatuses];
    updatedStatuses[index] =
      updatedStatuses[index] === "follow" ? "following" : "follow";
    setClubStatuses(updatedStatuses);
  };

  // Filter News Based on Selection
  const filteredNews = newsList.filter((news) => {
    if (filter === "following") return followClups.includes(news.clup);
    if (filter === "enrolled") return enrolledClups.includes(news.clup);
    return true; // Default: Show all
  });

  return (
    <Body>
      <div className="news-and-clubs-page">
        <Row>
          {/* News Section */}
          <Col lg={9} md={12}>
            <div className="news-box">
              <div className="news-header d-flex justify-content-between align-items-center">
                <h1 className="page-title">Latest News and Activities</h1>
                <div className="news-filter">
                  <Button
                    className={`filter-btn ${
                      filter === "following" ? "active" : ""
                    }`}
                    onClick={() =>
                      setFilter(filter === "following" ? "" : "following")
                    }
                  >
                    Following
                  </Button>
                  <Button
                    className={`filter-btn ${
                      filter === "enrolled" ? "active" : ""
                    }`}
                    onClick={() =>
                      setFilter(filter === "enrolled" ? "" : "enrolled")
                    }
                  >
                    Enrolled
                  </Button>
                </div>
              </div>
              <Row className="g-4">
                {filteredNews.map((news, index) => (
                  <Col key={index} lg={6} md={6} sm={12} xs={12}>
                    <a href={"/activity-view"}>
                    <div className="news-card">
                      <Image
                        src={news.img}
                        className="news-img"
                        alt={news.title}
                      />
                      <div className="news-details">
                        <h3 className="news-title">{news.title}</h3>
                        <p className="news-desc">{news.desc}</p>
                        <Button
                          className={`join-btn ${
                            clickedNews.includes(index) ? "joined" : ""
                          }`}
                          onClick={(e) =>{
                              e.preventDefault(); // Prevent link navigation
                                e.stopPropagation();
                              handleJoinClick(index)}}
                        >
                          {clickedNews.includes(index) ? "Joined" : "Join"}
                        </Button>
                        {clickedNews.includes(index) && (
                          <p className="joined-message">
                            You have successfully joined this activity!
                          </p>
                        )}
                      </div>
                    </div>
                    </a>
                  </Col>
                ))}
              </Row>
              <div className="view-all d-flex justify-content-center mt-4">
                <Button id="allNews" onClick={() => navigate("/latest-news")}>
                  All
                </Button>
              </div>
            </div>
          </Col>

          {/* Clubs Section */}
          <Col lg={3} md={12}>
            <div className="clubs-box">
              <h1 className="page-title">Clubs</h1>
              <div className="clubs-list">
                {clubList.map((club, index) => (
                    <a href={'/club-profile'}>
                  <div key={index} className="club-item">
                    <Image
                      src={club.logo}
                      className="club-logo"
                      alt={club.title}
                    />
                    <div className="club-details">
                      <h4 className="club-title">{club.title}</h4>
                      <Button
                        className={`club-action-btn ${clubStatuses[index]}`}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleFollowClick(index)}}
                      >
                        {clubStatuses[index] === "follow"
                          ? "Follow"
                          : "Following"}
                      </Button>
                    </div>
                  </div>
                    </a>
                ))}
              </div>
              <div className="view-all d-flex justify-content-center mt-4">
                <Button onClick={() => navigate("/clubs")}>All</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Body>
  );
};

export default NewsAndClubs;
