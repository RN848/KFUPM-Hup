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

const ManageProfile = () => {
  const [inputs, setInputs] = useState({
    clubName: "Computer Clup",
    logo: "No file chosen",
    desc: "",
    email: "",
    contactNumber: "",
    x: "",
  });

  return (
    <Body>
      <div className="body">
        <h1>Manage Profile </h1>
        <Row className={"g-4 wid-row"} md={2} sm={1} xs={1}>
          <Col>
            <div className="wid-colum">
              <Form className="form">
                <Link
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"clubName"}
                  type={"text"}
                  label={"Club Name"}
                />

                <Uplode
                  setInputs={setInputs}
                  inputs={inputs}
                  input={"logo"}
                  label={"Upload logo"}
                />

                <Textarea
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"desc"}
                  label={"Description"}
                  placeholder={
                    "detailed description of the club’s purpose, activities, and mission"
                  }
                />
              </Form>
            </div>
          </Col>
          <Col>
            <div className="wid-colum">
              <Form className="form"></Form>

              <div className="form">
                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"email"}
                  type={"email"}
                  label={"Email"}
                  placeholder={"Enter your email address"}
                />

                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"contactNumber"}
                  type={"text"}
                  label={"Contact Number"}
                  placeholder={"Enter clup contact number"}
                />

                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"x"}
                  type={"text"}
                  label={"X"}
                  placeholder={"Enter clup's X id"}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "20px",
                    marginTop: "50px",
                  }}
                >
                  <Button
                    className={"inputs-btn back"}
                    as="input"
                    type="submit"
                    value="Cancel"
                  />
                  <Button
                    className="inputs-btn"
                    as="input"
                    type="submit"
                    value="Save"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Body>
  );
};

export default ManageProfile;
