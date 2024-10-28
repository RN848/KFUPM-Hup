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

const LogIn = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  return (
    <Body>
      <div className="body">
        <h1>log In </h1>
        <div className={"g-4 wid-row"} md={2} sm={1} xs={1}>
          <div className="wid-colum" style={{ margin: "50px 0 100px" }}>
            <Form className="form">
              <NormInput
                inputs={inputs}
                setInputs={setInputs}
                input={"email"}
                type={"email"}
                label={"Email"}
                placeholder={"email"}
              />

              <NormInput
                inputs={inputs}
                setInputs={setInputs}
                input={"password"}
                type={"password"}
                label={"Password"}
                placeholder={"Password"}
              />

              <Button
                style={{ width: "100%" }}
                className="inputs-btn"
                as="input"
                type="submit"
                value="log In"
              />

              <Button
                style={{
                  width: "100%",
                  marginTop: "20px",
                }}
                className={"inputs-btn white"}
                as="input"
                type="submit"
                value="Sign Up"
              />
            </Form>
          </div>
        </div>
      </div>
    </Body>
  );
};

export default LogIn;
