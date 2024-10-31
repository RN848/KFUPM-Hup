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
  //   const [sport, setsport] = useState({
  //     filter: "",
  //   });

  //   const sportsMap = sportsList.map((s) => {
  //     const isActive = sport === s.name;

  //     return (
  //       <div className={isActive ? "focus" : ""}>
  //         <a
  //           href=""
  //           onClick={(e) => {
  //             e.preventDefault();
  //             setsport(s.name);
  //           }}
  //         >
  //           <Image className="img" src={s.image}></Image>
  //         </a>
  //         <span>{s.name}</span>
  //       </div>
  //     );
  //   });

  const reservesList = [
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "Sunday",
      join: "link/link/...",
    },
  ];

  //   const filteredReserves = reservesList.filter(
  //     (box) => sport.filter === "" || box.sport === sport
  //   );

  const reserveMap = reservesList.map((box) => {
    return (
      <Col lg={4} md={4} sm={6} xs={12} className="news-col">
        <a href="">
          <div>
            <h3>{box.sport}</h3>
            <div className="deteils">
              <span>{box.title}</span>
              <span>{box.day}</span>
              <span>{box.time}</span>
            </div>
          </div>
        </a>
      </Col>
    );
  });

  return (
    <Body>
      <div className="body">
        <h1>Manage Profile </h1>

        <Row className={"g-4 wid-row news-box "}>{reserveMap}</Row>
      </div>
    </Body>
  );
};

export default LatestNews;
