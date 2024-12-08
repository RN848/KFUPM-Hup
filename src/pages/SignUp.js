// SignUp.js
import Body from "../components/Body";
import "../styles/pages/_logIn.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student", // Default role is "Student"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/userRoutes/Sign-Up"; // Correct backend URL for sign-up
      const { data: res } = await axios.post(url, data);
      console.log(res.message); // Log response for debugging
      navigate("/Log-In"); // Redirect to login page after successful sign-up
    } catch (err) {
      if (err.response && err.response.status >= 400 && err.response.status <= 500) {
        setError(err.response.data.message); // Show error message from backend
        console.error("Sign-up failed:", err.response.data.message); // Log detailed error for debugging
      } else {
        setError("An unexpected error occurred. Please try again."); // Fallback error message
        console.error("Unexpected error:", err); // Log unexpected errors
      }
    }
  };

  return (
    <Body>
      <div className="login-container">
        <h1 className="main-heading">Welcome to KFUPM HUB</h1>
        <div className="login-form">
          <h2 className="login-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="login-btn">
              Sign Up
            </button>
          </form>

          {error && <div>{error}</div>} {/* Display error message */}

          <p style={{ textAlign: "center", color: "#ccc", marginTop: "1rem" }}>
            Already have an account? Log in below.
          </p>
          <button className="signup-btn" onClick={() => navigate("/Log-In")}>
            Log In
          </button>
        </div>
      </div>
    </Body>
  );
};

export default SignUp;
