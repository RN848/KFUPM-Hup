import Body from "../components/Body";
import "../styles/main.css";
import "../styles/pages/_logIn.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { NormInput } from "../components/Inputs";

const NewClub = () => {
  const [inputs, setInputs] = useState({
    clubName: "",
    leader: "",
  });

  return (
    <Body>
      <div className="login-container">
        <h1 className="main-heading" style={{ color: "white" }}>
          New Club
        </h1>
        <div className="login-form">
          <Form className="form">
            <NormInput
              inputs={inputs}
              setInputs={setInputs}
              input={"clubName"}
              type={"text"}
              label={"Club Name"}
              placeholder={"Enter the club name"}
            />
            <NormInput
              inputs={inputs}
              setInputs={setInputs}
              input={"leader"}
              type={"text"}
              label={"Leader"}
              placeholder={"ID of the leader"}
            />
            <Button
              className="login-btn"
              as="input"
              type="submit"
              value="Create"
            />
          </Form>
        </div>
      </div>
    </Body>
  );
};

export default NewClub;
