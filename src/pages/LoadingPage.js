import React from "react";
import "../styles/pages/_loadingPage.scss"; // Create or update the CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-content">
        <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
        <h1>Loading....</h1>
      </div>
    </div>
  );
};

export default LoadingPage;
