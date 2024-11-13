// GlassyCard.js
import React from "react";
import "../styles/components/GlassyCard.scss";

const GlassyCard = ({ title }) => {
  return (
    <div className="glassy-card">
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  );
};

export default GlassyCard;
