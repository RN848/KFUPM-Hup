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

const YourProfile = () => {
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
            <div className="wid-colum">
              <Form className="form">
                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"title"}
                  type={"text"}
                  label={"Title"}
                  placeholder={"A short, descriptive name for the activity"}
                />

                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"subtitle"}
                  type={"text"}
                  label={"Subtitle"}
                  placeholder={"Your Subtitle Here"}
                />

                <Textarea
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"desc"}
                  label={"Description"}
                  placeholder={"A detailed explanation of the activity/news"}
                />
              </Form>
            </div>
          </Col>
          <Col>
            <div className="wid-colum">
              <Form className="form">
                <Radio
                  inputs={inputs}
                  setInputs={setInputs}
                  input="type"
                  label="Select Type"
                  radio1="Activity"
                  radio2="News"
                />

                <Radio
                  inputs={inputs}
                  setInputs={setInputs}
                  input="appearance"
                  label="Select Category"
                  radio1="All"
                  radio2="Members Only"
                />

                <Link
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"joinLink"}
                  type={"text"}
                  label={"Join Link"}
                />

                <Uplode
                  setInputs={setInputs}
                  inputs={inputs}
                  input={"image"}
                  label={"Upload Image"}
                  placeholder={"No file chosen"}
                />
              </Form>

              <div className="form">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "20px",
                    marginTop: "50px",
                  }}
                >
                  <Button
                    className="inputs-btn"
                    as="input"
                    type="submit"
                    value="Submit"
                  />
                  <Button
                    className="inputs-btn"
                    as="input"
                    type="submit"
                    value="Submit"
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

export default YourProfile;
