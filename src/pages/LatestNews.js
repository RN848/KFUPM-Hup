import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

import { NormInput } from "../components/Inputs";
import { Textarea } from "../components/Inputs";
import { Radio } from "../components/Inputs";
import { Uplode } from "../components/Inputs";
import { Link } from "../components/Inputs";

import Basketball from "../images/sports/sport-1.jpg";
import Football from "../images/sports/sport-2.jpg";
import tennis from "../images/sports/sport-3.jpg";
import Volleyball from "../images/sports/sport-4.jpg";
import Squash from "../images/sports/sport-5.jpg";
import Badminton from "../images/sports/sport-6.jpg";

const LatestNews = () => {
  const newsList = [
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-01.jpg",
      join: "",
      clup: "1",
    },
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-02.jpg",
      join: "",
      clup: "2",
    },
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-03.jpg",
      join: "",
      clup: "3",
    },
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-04.jpg",
      join: "",
      clup: "1",
    },
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-01.jpg",
      join: "",
      clup: "2",
    },
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-03.jpg",
      join: "",
      clup: "1",
    },
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-02.jpg",
      join: "",
      clup: "1",
    },
  ];

  const [filter, setFilter] = useState("");

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

  const newsMap = filteredNews.map((news) => {
    return (
      <Col lg={6} md={6} sm={12} xs={12} className="news-col">
        <a href="">
          <div>
            <Image className="img" src={news.img}></Image>
            <div className="deteils">
              <div className="text">
                <h3>{news.title}</h3>
                <p>{news.desc}</p>
              </div>
              <div className="form">
                <Button className="join">join</Button>
              </div>
            </div>
          </div>
        </a>
      </Col>
    );
  });

  const newsfilter = newsMap.filter((news) => {});

  return (
    <Body>
      <div className="body">
        <div className={"filter"}>
          <h1>Manage Profile </h1>
          <Button
            className={`filterb ${filter === "following" ? "active" : ""}`}
            onClick={() =>
              setFilter(
                filter === "" || filter === "enrolled" ? "following" : ""
              )
            }
          >
            following
          </Button>
          <Button
            className={`filterb ${filter === "enrolled" ? "active" : ""}`}
            onClick={() =>
              setFilter(
                filter === "" || filter === "following" ? "enrolled" : ""
              )
            }
          >
            enrolled
          </Button>
        </div>

        <Row className={"g-4 wid-row news-box "}>{newsMap}</Row>
      </div>
    </Body>
  );
};

export default LatestNews;
