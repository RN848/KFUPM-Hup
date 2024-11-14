import React, { useState } from "react";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_latestNews.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image, Button } from "react-bootstrap";

const LatestNews = () => {
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

  const [filter, setFilter] = useState(""); // Filter state
  const [clickedNews, setClickedNews] = useState([]); // Track joined activities

  const handleJoinClick = (index) => {
    if (!clickedNews.includes(index)) {
      setClickedNews([...clickedNews, index]);
    } else {
      setClickedNews(clickedNews.filter((i) => i !== index)); // Allow toggling
    }
  };

  // Filtered news list
  const filteredNewsList = newsList.filter((_, index) => {
    if (filter === "following") return index % 2 === 0; // Example: Show every alternate news item
    if (filter === "enrolled") return clickedNews.includes(index); // Show joined news
    return true; // Show all if no filter
  });

  const newsMap = filteredNewsList.map((news, index) => (
      <Col key={index} lg={6} md={6} sm={12} xs={12} className="news-col">
        <a href={"/activity-view"} className="news-link">
          <div className="news-card">
            <Image className="news-img" src={news.img} alt={news.title} />
            <div className="news-details">
              <h3 className="news-title">{news.title}</h3>
              <p className="news-desc">{news.desc}</p>
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
