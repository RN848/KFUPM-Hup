import Body from "../components/Body";
import "../styles/pages/_logIn.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  localStorage.clear();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const adminLogin = {
    email: "admin@gmail.com",
    password: "passwordAdmin",
    isAdmin: true,
    isOwner: false,
  };
  const ClubAccount = {
    email: "club@gmail.com",
    password: "passwordClub",
    isAdmin: false,
    isOwner: true,
  };
  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };
  const checkForm = (e) => {
    e.preventDefault();
    let userRole = "normal"; // default role

    if (
      inputs.email === adminLogin.email &&
      inputs.password === adminLogin.password
    ) {
      userRole = "admin";
    } else if (
      inputs.email === ClubAccount.email &&
      inputs.password === ClubAccount.password
    ) {
      userRole = "clubAccount";
    }

    localStorage.setItem("userRole", userRole); // Store the user role in local storage
    navigate("/home");
  };

  return (
    <Body>
      <div className="login-container">
        <h1 className="main-heading">Welcome to KFUPM HUB</h1>
        <div className="login-form">
          <h2 className="login-title">Log In</h2>
          <form onSubmit={checkForm}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={inputs.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={inputs.password}
              onChange={handleInputChange}
              required
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
