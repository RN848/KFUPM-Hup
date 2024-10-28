import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

import { NormInput } from "../components/Inputs";
import { Textarea } from "../components/Inputs";
import { Radio } from "../components/Inputs";
import { Uplode } from "../components/Inputs";
import { Link } from "../components/Inputs";

const Home = () => {
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
        <h1>Start Page</h1>
        <Row className={"g-4 wid-row"} md={2} sm={1} xs={1}>
          <Col>
            <div className="wid-colum"></div>
          </Col>
          <Col>
            <div className="wid-colum"></div>
          </Col>
        </Row>
      </div>
    </Body>
  );
};

export default Home;
