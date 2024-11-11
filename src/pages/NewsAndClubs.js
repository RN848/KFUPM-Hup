import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_latestNews.scss"; // Reuse shared styles
import "../styles/pages/_newsAndClubs.scss"; // Add specific styles for this page
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewsAndClubs = () => {
  const clubList = [
    {
      title: "Computer Club",
      logo: "../images/clubs/computer_club.png",
      status: "follow",
    },
    {
      title: "Computer Club",
      logo: "../images/clubs/computer_club.png",
      status: "following",
    },
    {
      title: "Computer Club",
      logo: "../images/clubs/computer_club.png",
      status: "follow",
    },
  ];

  const [clickedNews, setClickedNews] = useState([]);
  const [filterMessage, setFilterMessage] = useState("");
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

  const [filter, setFilter] = useState("");

  const followClups = ["1", "2"];
  const enrolledClups = ["3"];

  const handleJoinClick = (index) => {
    if (!clickedNews.includes(index)) {
      setClickedNews([...clickedNews, index]);
    }
  };

  const handleFollowClick = (index) => {
    const updatedStatuses = [...clubStatuses];
    updatedStatuses[index] =
      updatedStatuses[index] === "follow" ? "following" : "follow";
    setClubStatuses(updatedStatuses);
  };

  const filteredNews = newsList.filter((news) => {
    if (filter === "following") return followClups.includes(news.clup);
    if (filter === "enrolled") return enrolledClups.includes(news.clup);
    return true; // Default: Show all
  });

  return (
    <Body>
      <div className="news-and-clubs-page">
        <Row>
          {/* Left Section */}
          <Col lg={9} md={12}>
            <div className="news-box">
              <div className="news-header d-flex justify-content-between align-items-center">
                <h1 className="page-title">Latest News and Activities</h1>
                <div className="news-filter">
                  <Button
                    className={`filter-btn ${
                      filter === "following" ? "active" : ""
                    }`}
                    onClick={() => {
                      const newFilter =
                        filter === "" || filter === "enrolled"
                          ? "following"
                          : "";
                      setFilter(newFilter);
                      setFilterMessage(
                        newFilter === "following"
                          ? "Now viewing Following items."
                          : ""
                      );
                    }}
                  >
                    Following
                  </Button>
                  <Button
                    className={`filter-btn ${
                      filter === "enrolled" ? "active" : ""
                    }`}
                    onClick={() => {
                      const newFilter =
                        filter === "" || filter === "following"
                          ? "enrolled"
                          : "";
                      setFilter(newFilter);
                      setFilterMessage(
                        newFilter === "enrolled"
                          ? "Now viewing Enrolled items."
                          : ""
                      );
                    }}
                  >
                    Enrolled
                  </Button>
                </div>
              </div>
              <Row className="g-4">
                {filteredNews.map((news, index) => (
                  <Col key={index} lg={6} md={6} sm={12} xs={12}>
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
                          className={`news-join-btn ${
                            clickedNews.includes(index) ? "joined" : ""
                          }`}
                          onClick={() => handleJoinClick(index)}
                        >
                          {clickedNews.includes(index) ? "Joined" : "Join"}
                        </Button>
                        {/* Success Message */}
                        {clickedNews.includes(index) && (
                          <div className="joined-message">
                            You have successfully joined this activity!
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>

              <div className="view-all d-flex justify-content-center mt-4">
                <Button onClick={() => navigate("/latest-news")}>All</Button>
              </div>
            </div>
          </Col>

          {/* Right Section */}
          <Col lg={3} md={12}>
            <div className="clubs-box">
              <h1 className="page-title">Clubs</h1>
              <div className="clubs-list">
                {clubList.map((club, index) => (
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
                        onClick={() => handleFollowClick(index)}
                      >
                        {clubStatuses[index]}
                      </Button>
                    </div>
                  </div>
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
