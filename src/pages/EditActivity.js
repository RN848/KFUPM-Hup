import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_latestNews.scss"; // Reusing the LatestNews styles
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const EditActivity = () => {
  const [newsList, setNewsList] = useState([
    {
      title: "News Activity 1",
      desc: "Description for activity 1.",
      img: "../images/activities/activity-01.png",
      clup: "1",
    },
    {
      title: "News Activity 2",
      desc: "Description for activity 2.",
      img: "../images/activities/activity-02.jpeg",
      clup: "2",
    },
    {
      title: "News Activity 3",
      desc: "Description for activity 3.",
      img: "../images/activities/activity-03.jpg",
      clup: "3",
    },
    {
      title: "News Activity 4",
      desc: "Description for activity 4.",
      img: "../images/activities/activity-04.jpg",
      clup: "1",
    },
  ]);

  const handleEditClick = (title) => {
    alert(`Editing activity: ${title}`);
  };

  return (
    <Body>
      <div className="news-page">
        <h1 className="page-title" style={{ marginBottom: "30px" }}>
          Edit News and Activities
        </h1>
        <Row className="news-container">
          {newsList.map((news, index) => (
            <Col key={index} lg={6} md={6} sm={12} xs={12} className="news-col">
              <div className="news-card">
                <Image className="news-img" src={news.img} alt={news.title} />
                <div className="news-details">
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-desc">{news.desc}</p>
                  <Button
                    className="news-join-btn"
                    onClick={() => handleEditClick(news.title)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Body>
  );
};

export default EditActivity;
