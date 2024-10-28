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
    name: "",
    profilePicture: "No file chosen",
    interests: "",
    role: "",
    email: "forexample@gmail.com",
    changePassword: "dsdfsdfsdfsfsd",
    contactNumber: "",
    linkedIn: "",
    id: "23234",
  });

  return (
    <Body>
      <div className="body">
        <h1>Your Profile</h1>
        <Row className={"g-4 wid-row"} md={2} sm={1} xs={1}>
          <Col>
            <div className="wid-colum">
              <Form className="form">
                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"name"}
                  type={"text"}
                  label={"Name"}
                  placeholder={"name"}
                />

                <Uplode
                  setInputs={setInputs}
                  inputs={inputs}
                  input={"profilePicture"}
                  label={"Profile Picture"}
                />

                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"interests"}
                  type={"text"}
                  label={"Interests"}
                  placeholder={"football , recearch"}
                />

                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"role"}
                  type={"text"}
                  label={"Role"}
                  placeholder={"Student, Club Leader (Green Society Club)"}
                />
              </Form>
            </div>
          </Col>
          <Col>
            <div className="wid-colum">
              <Form className="form">
                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"email"}
                  type={"email"}
                  label={"Change Email"}
                  placeholder={"email"}
                />

                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"changePassword"}
                  type={"password"}
                  label={"Change Password"}
                  placeholder={""}
                />

                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"contactNumber"}
                  type={"text"}
                  label={"Contact Number"}
                  placeholder={"Enter the contact number"}
                />

                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"linkedIn"}
                  type={"text"}
                  label={"Linked In"}
                  placeholder={"id"}
                />

                <Link
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"id"}
                  type={"text"}
                  label={"Id"}
                  placeholder={""}
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

export default YourProfile;
