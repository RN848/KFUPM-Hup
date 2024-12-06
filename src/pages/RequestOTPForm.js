//src/pages/RequestOTPForm.js
import React, { useState } from "react";
import axios from "axios";

function RequestOTPForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@kfupm\.edu\.sa$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side email validation
    if (!emailRegex.test(email)) {
      setMessage("Invalid email format. Please use 'anything@kfupm.edu.sa'.");
      return;
    }

    try {
      const res = await axios.post("/api/otp/request-otp", { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Request OTP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Request OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RequestOTPForm;
