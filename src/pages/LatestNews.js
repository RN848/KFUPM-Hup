import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_latestNews.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const LatestNews = () => {
  const newsList = [
    {
      title: "News Title 1",
      desc: "Description of the news or activity goes here.",
      img: "../images/activities/activity-01.png",
      join: "",
      clup: "1",
    },
    {
      title: "News Title 2",
      desc: "Another news description goes here.",
      img: "../images/activities/activity-02.jpeg",
      join: "",
      clup: "2",
    },
    {
      title: "News Title 3",
      desc: "Details about the third news or activity.",
      img: "../images/activities/activity-03.jpg",
      join: "",
      clup: "3",
    },
    {
      title: "News Title 4",
      desc: "Details about the third news or activity.",
      img: "../images/activities/activity-04.jpg",
      join: "",
      clup: "4",
    },
  ];

  const [filter, setFilter] = useState("");
  const [clickedNews, setClickedNews] = useState([]); // Track clicked buttons by index

  const followClups = ["1", "2"];
  const enrolledClups = ["3"];

  const filteredNews = newsList.filter((news) => {
    if (filter === "following") {
      return followClups.includes(news.clup);
    }
    if (filter === "enrolled") {
      return enrolledClups.includes(news.clup);
    }
    return true; // Show all news if no filter is applied
  });

  const handleJoinClick = (index) => {
    if (!clickedNews.includes(index)) {
      setClickedNews([...clickedNews, index]); // Add index to clickedNews
    }
  };

  const newsMap = filteredNews.map((news, index) => (
    <Col key={index} lg={6} md={6} sm={12} xs={12} className="news-col">
      <div className="news-card">
        <Image className="news-img" src={news.img} alt={news.title} />
        <div className="news-details">
          <h3 className="news-title">{news.title}</h3>
          <p className="news-desc">{news.desc}</p>
          {!clickedNews.includes(index) ? (
            <Button
              className="news-join-btn"
              onClick={() => handleJoinClick(index)}
            >
              Join
            </Button>
          ) : (
            <p className="joined-message">You have joined this activity!</p>
          )}
        </div>
      </div>
    </Col>
  ));

  return (
    <Body>
      <div className="news-page">
        <h1 className="page-title">Latest News and Activities</h1>
        <div className="news-filter">
          <Button
            className={`filter-btn ${filter === "following" ? "active" : ""}`}
            onClick={() =>
              setFilter(
                filter === "" || filter === "enrolled" ? "following" : ""
              )
            }
          >
            Following
          </Button>
          <Button
            className={`filter-btn ${filter === "enrolled" ? "active" : ""}`}
            onClick={() =>
              setFilter(
                filter === "" || filter === "following" ? "enrolled" : ""
              )
            }
          >
            Enrolled
          </Button>
        </div>
        <Row className="news-container">{newsMap}</Row>
      </div>
    </Body>
  );
};

export default LatestNews;
