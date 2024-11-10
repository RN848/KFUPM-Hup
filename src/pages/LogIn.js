import Body from "../components/Body";
import "../styles/pages/_logIn.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NormInput } from "../components/Inputs";

const LogIn = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  return (
    <Body>
      <div className="login-container">
        <h1 className="main-heading">Welcome to KFUPM HUB</h1>
        <div className="login-form">
          <h2 className="login-title">Log In</h2>
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />

            <button type="submit" className="login-btn">
              Log In
            </button>
          </form>
          <p style={{ textAlign: "center", color: "#ccc", marginTop: "1rem" }}>
            Don't have an account yet? Sign up below.
          </p>
          <button className="signup-btn" onClick={() => navigate("/Sign-Up")}>
            Sign Up
          </button>
        </div>
      </div>
    </Body>
  );
};

export default LogIn;
