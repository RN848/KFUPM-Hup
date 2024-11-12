import Body from "../components/Body";
import "../styles/pages/_logIn.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const adminLogin = {
    email: 'admin@gmail.com',
    password: 'passwordAdmin',
    isAdmin: true,
    isOwner: false,
  };

  const reservationOwner = {
    email: 'Owner@gmail.com',
    password: 'passwordOwner',
    isAdmin: false,
    isOwner: true,
  };

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };

  const checkForm = (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    if (
        inputs.email === adminLogin.email &&
        inputs.password === adminLogin.password
    ) {
      console.log("Logged in as Admin");
      navigate("/home");
    } else if (
        inputs.email === reservationOwner.email &&
        inputs.password === reservationOwner.password
    ) {
      console.log("Logged in as Reservation Owner");
      navigate("/home");
    } else {
      console.log("Logged in as Normal User");
      navigate("/home");
    }
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
