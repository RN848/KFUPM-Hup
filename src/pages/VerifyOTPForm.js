import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pages/_logIn.scss";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import Body from "../components/Body";

function VerifyOTPForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation(); // This gives access to the state passed by navigate()

  const emailRegex = /^[a-zA-Z0-9._%+-]+@kfupm\.edu\.sa$/;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If the state contains an email, set it so the user doesn't have to re-enter
    if (state?.email) {
      setEmail(state.email);
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("OTP entered by user:", otp);
    setLoading(true);

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/otpRoutes/verify-otp",
        { email, otp }
      );
      setMessage(res.data.message);

      navigate("/home");
    } catch (error) {
      console.error("Error details:", error);
      setMessage(error.response?.data?.message || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid KFUPM email before resending OTP.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/otpRoutes/request-otp",
        { email }
      );
      setMessage(res.data.message);
    } catch (error) {
      console.error("Error resending OTP:", error);
      setMessage(error.response?.data?.message || "Error resending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Body>
      <div className="login-container">
        <h1 className="main-heading">Verify OTP</h1>
        <div className="login-form">
          <h2 className="login-title">Verify OTP</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your KFUPM email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              Verify OTP
            </button>
          </form>

          <button
            onClick={handleResendOTP}
            className="login-btn"
            style={{ marginTop: "1rem" }}
          >
            Resend OTP
          </button>

          {message && (
            <div style={{ color: "green", marginTop: "1rem" }}>{message}</div>
          )}
          {loading && (
            <div style={{ color: "#888", marginTop: "1rem" }}>Loading...</div>
          )}
        </div>
      </div>
    </Body>
  );
}

export default VerifyOTPForm;
