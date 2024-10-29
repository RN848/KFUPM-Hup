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

const SportsReserve = () => {
  const [sport, setsport] = useState({
    filter: "",
  });

  const sportsList = [
    { name: "Basketball", image: Basketball },
    { name: "Football", image: Football },
    { name: "tennis", image: tennis },
    { name: "Volleyball", image: Volleyball },
    { name: "Squash", image: Squash },
    { name: "Badminton", image: Badminton },
  ];

  const sportsMap = sportsList.map((s) => {
    return (
      <div>
        <a href="">
          <Image src={s.image}></Image>
        </a>
        <span>{s.name}</span>
      </div>
    );
  });

  const reservesList = [
    { sport: "Football", feild: "Feild 1", day: "Sunday", time: "1:00" },
    { sport: "Basketball", feild: "Feild 2", day: "monday", time: "1:00" },
    { sport: "tennis", feild: "Feild 1", day: "Sunday", time: "1:00" },
    { sport: "Football", feild: "Feild 3", day: "friday", time: "1:00" },
    { sport: "Basketball", feild: "Feild 4", day: "Sunday", time: "1:00" },
    { sport: "Football", feild: "Feild 4", day: "monday", time: "1:00" },
    { sport: "Football", feild: "Feild 1", day: "Sunday", time: "1:00" },
    { sport: "Volleyball", feild: "Feild 6", day: "friday", time: "1:00" },
    { sport: "Football", feild: "Feild 2", day: "monday", time: "1:00" },
    { sport: "tennis", feild: "Feild 2", day: "Sunday", time: "1:00" },
    { sport: "Badminton", feild: "Feild 1", day: "friday", time: "1:00" },
    { sport: "Football", feild: "Feild 3", day: "Sunday", time: "1:00" },
    { sport: "Squash", feild: "Feild 1", day: "Sunday", time: "1:00" },
    { sport: "Squash", feild: "Feild 3", day: "monday", time: "1:00" },
    { sport: "Football", feild: "Feild 1", day: "Sunday", time: "1:00" },
  ];

  const reserveMap = reservesList.map((box) => {
    return (
      <Col lg={4} md={4} sm={6} xs={12} className="sport-col">
        <a href="">
          <div>
            <h3>{box.sport}</h3>
            <div className="deteils">
              <span>{box.feild}</span>
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
        <Row
          className={"g-4 wid-row reverse"}
          style={{ marginBottom: "1.5em" }}
        >
          <Col lg={8} md={8} sm={12}>
            <div className={"wid-colum sports"}>{sportsMap}</div>
          </Col>
          <Col>
            <div className="wid-colum"></div>
          </Col>
        </Row>
        <Row className={"g-4 wid-row sports-box"}>{reserveMap}</Row>
      </div>
    </Body>
  );
};

export default SportsReserve;
