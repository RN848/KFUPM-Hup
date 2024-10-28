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

const NewClup = () => {
  const [inputs, setInputs] = useState({
    clubName: "",
    leader: "",
  });

  return (
    <Body>
      <div className="body">
        <h1>New Clup</h1>
        <div className={"g-4 wid-row"} md={2} sm={1} xs={1}>
          <div className="wid-colum" style={{ margin: "80px 0 200px" }}>
            <Form className="form">
              <NormInput
                inputs={inputs}
                setInputs={setInputs}
                input={"clubName"}
                type={"text"}
                label={"Club Name"}
                placeholder={"Club Name"}
              />

              <NormInput
                inputs={inputs}
                setInputs={setInputs}
                input={"leader"}
                type={"text"}
                label={"Leader"}
                placeholder={"id of the leader"}
              />

              <Button
                style={{ width: "100%" }}
                className="inputs-btn"
                as="input"
                type="submit"
                value="Create"
              />
            </Form>
          </div>
        </div>
      </div>
    </Body>
  );
};

export default NewClup;
