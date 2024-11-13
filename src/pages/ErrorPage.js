import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/_errorPage.scss";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-message">
        <h1>Oops....</h1>
        <h2>Page not found</h2>
        <p>This Page doesn't exist or was removed!</p>
        <p>We suggest you go back to home.</p>
        <button className="back-home-button" onClick={() => navigate("/home")}>
          ↩ Back to Home
        </button>
      </div>
      <div className="error-image">
        <img src="/images/error.png" alt="Error 404 Illustration" />
      </div>
    </div>
  );
};

export default ErrorPage;
