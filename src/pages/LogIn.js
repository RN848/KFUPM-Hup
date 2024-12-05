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

  // Regular expression to validate the email format (e.g., yxxxxxxxxx@kfupm.edu.sa)
  // const emailRegex = /^[a-zA-Z]\d{9}@kfupm\.edu\.sa$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@kfupm\.edu\.sa$/;

  const handleInputChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email matches the required pattern
    if (!emailRegex.test(data.email)) {
      setError("Please enter a valid email in the format Name/ID@kfupm.edu.sa.");
      return; // Stop further submission if email is invalid
    }

    let userRole = "normal"; // Default role is "normal"
    try {
      const url = "http://localhost:5000/api/authRoutes/Log-In"; // Correct login API endpoint
      const { data: res } = await axios.post(url, data);

      // Store token in localStorage
      localStorage.setItem("token", res.data.token);

      // Check the role from the response and store it in localStorage
      if (res.data.role === "admin") {
        userRole = "admin";
      } else if (res.data.role === "clubAccount") {
        userRole = "clubAccount";
      }
      localStorage.setItem("userRole", userRole);

      // Redirect to home page upon successful login
      navigate("/home");
    } catch (err) {
      if (err.response) {
        // Customize error handling based on status code
        if (err.response.status === 401) {
          setError("Invalid credentials, please try again.");
        } else if (err.response.status === 500) {
          setError("Server error, please try again later.");
        } else {
          setError(err.response.data.message || "An error occurred.");
        }
        console.error("Login failed:", err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
        console.error("Unexpected error:", err);
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

          {error && <div>{error}</div>} {/* Display error message */}

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
