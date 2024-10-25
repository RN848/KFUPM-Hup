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

const Home = () => {
  const [inputs, setInputs] = useState({
    title: "",
    subtitle: "",
    desc: "",
    type: "activity",
    appearance: "all",
    joinLink: "",
    image: "No file chosen",
  });

  return (
    <Body>
      <div className="body">
        <h1>Start Page</h1>
        <Row className="g-4" md={2} sm={1} xs={1}>
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
                  label={"Email address"}
                  placeholder={""}
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
                <Form.Label className="label">Example textarea</Form.Label>
                {["radio"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="1"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="2"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                  </div>
                ))}
                {/*  */}
                <Form.Label className="label">Example textarea</Form.Label>
                {["radio"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="1"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="2"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                  </div>
                ))}
                <Form.Label className="label">Example textarea</Form.Label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      style={{}}
                    />
                  </div>
                  <div>
                    <label for="inputField" className={"btn btn-info"}>
                      Try me
                    </label>
                    <input
                      type="file"
                      id="inputField"
                      style={{ display: "none" }}
                    ></input>
                  </div>
                </div>
              </Form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "20px",
                  marginTop: "50px",
                }}
              >
                <Button as="input" type="submit" value="Submit" />
                <Button as="input" type="submit" value="Submit" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Body>
  );
};

export default Home;
