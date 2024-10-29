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

import reserve from "../images/home/reserve.jpg";
import clups from "../images/home/clups.jpg";

const SportsReserve = () => {
  const [inputs, setInputs] = useState({
    title: "",
    subtitle: "",
    desc: "",
    type: "activity",
    appearance: "all",
    joinLink: "dfdffdf",
    image: "No file chosen",
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
            <div className="wid-colum"></div>
          </Col>
          <Col>
            <div className="wid-colum"></div>
          </Col>
        </Row>
        <Row className={"g-4 wid-row "}>
          <Col lg={12}>
            <div className="wid-colum">
              <Row className={"g-4 wid-row "} md={3} sm={2} xs={1}>
                <Col>
                  <div className={"wid-colum reserv-card"}></div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Body>
  );
};

export default SportsReserve;
