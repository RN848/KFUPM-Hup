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

  const [inputs, setInputs] = useState({
    code: "",
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
    const isActive = sport === s.name;

    return (
      <div className={isActive ? "focus" : ""}>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            setsport(s.name);
          }}
        >
          <Image className="img" src={s.image}></Image>
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

  const filteredReserves = reservesList.filter(
    (box) => sport.filter === "" || box.sport === sport
  );

  const reserveMap = filteredReserves.map((box) => {
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
            <div className="wid-colum">
              <div
                className="form"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                <div
                  style={{
                    margin: "0 10px  15px 0",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Button
                    style={{ margin: "0 10px 0 0" }}
                    className="inputs-btn"
                    as="input"
                    type="submit"
                    value="Save"
                  />
                  <Button
                    className="inputs-btn"
                    as="input"
                    type="submit"
                    value="Save"
                  />
                </div>
                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"number"}
                  type={"code"}
                  label={"Code"}
                  placeholder={"2335"}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row className={"g-4 wid-row sports-box"}>{reserveMap}</Row>
      </div>
    </Body>
  );
};

export default SportsReserve;
