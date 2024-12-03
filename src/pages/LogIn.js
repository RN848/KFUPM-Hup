// LogIn.js
import Body from "../components/Body";
import "../styles/pages/_logIn.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";





const LogIn = () => {
  localStorage.clear();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };


/////////////////////////////////////////////////////////////
  // const handleInputChange = (e) => {
  //   setData({ ...data, [e.target.id]: e.target.value });
  // };
/////////////////////////////////////////////////////////////



  const handleSubmit = async (e) => {
    e.preventDefault();

    let userRole = "normal"; // default role
    try {
      const url = "http://localhost:5000/api/authRoutes/Log-In"; // Correct login API endpoint
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data); // Store token in localStorage

///////////////////////////////////////////////////////
      if (res.data.role==="admin"){
        userRole="admin"
      }else if(res.data.role==="clubAccount"){
        userRole="clubAccount"
      }
      localStorage.setItem("userRole", userRole); // Store the user role in local storage


//////////////////////////////////////////////////////
      navigate("/home"); // Redirect to home page on successful login
    } catch (err) {
      // Check if error response exists from backend
      if (err.response && err.response.status >= 400 && err.response.status <= 500) {
        setError(err.response.data.message); // Show error message from backend
        console.error("Login failed:", err.response.data.message); // Log detailed error for debugging
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
