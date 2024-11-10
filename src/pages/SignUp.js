import Body from "../components/Body";
import "../styles/pages/_logIn.scss"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  return (
    <Body>
      <div className="login-container">
        <h1 className="main-heading">Welcome to KFUPM HUB</h1>
        <div className="login-form">
          <h2 className="login-title">Sign Up</h2>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />

            <button type="submit" className="login-btn">
              Sign Up
            </button>
          </form>
          <p style={{ textAlign: "center", color: "#ccc", marginTop: "1rem" }}>
            Already have an account? Log in below.
          </p>
          <button
            className="signup-btn"
            onClick={() => navigate("/Log-In")} 
          >
            Log In
          </button>
        </div>
      </div>
    </Body>
  );
};

export default SignUp;
