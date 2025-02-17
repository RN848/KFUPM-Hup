// LogIn.js
import Body from "../components/Body";
import "../styles/pages/_logIn.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@kfupm\.edu\.sa$/;

  const handleInputChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(data.email)) {
      setError(
        "Please enter a valid KFUPM email (e.g., yxxxxxxxxx@kfupm.edu.sa)."
      );
      return;
    }
    try {
      const url = "http://localhost:5001/api/authRoutes/Log-In";
      const { data: res } = await axios.post(url, data);

      // Assuming OTP verified is included in the response or just trust the backend not returning if not verified
      localStorage.setItem("token", res.data.token);
      const userRole = res.data.role || "normal";
      localStorage.setItem("userRole", userRole);

      navigate("/home");
    } catch (err) {
      if (err.response) {
        if (
          err.response.status === 403 &&
          err.response.data.message ===
            "Your account is not verified. Please verify your OTP."
        ) {
          // If the user's account is not verified, redirect them to the verify-otp page
          navigate("/verify-otp", {
            state: { email: data.email, notVerified: true },
          });
        } else if (
          err.response.status === 404 &&
          err.response.data.message === "User not found"
        ) {
          setError("You do not have an account. Please sign up.");
        } else if (
          err.response.status === 401 &&
          err.response.data.message === "Invalid credentials"
        ) {
          setError("Invalid credentials, please try again.");
        } else if (err.response.status === 500) {
          setError("Server error, please try again later.");
        } else {
          setError(err.response.data.message || "An error occurred.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Body>
      <div className="login-container">
        <h1 className="main-heading">Welcome to KFUPM HUB</h1>
        <div className="login-form">
          <h2 className="login-title">Log In</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleInputChange}
              required
            />

            <button type="submit" className="login-btn">
              Log In
            </button>
          </form>

          {error && <div style={{ color: "red" }}>{error}</div>}

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
