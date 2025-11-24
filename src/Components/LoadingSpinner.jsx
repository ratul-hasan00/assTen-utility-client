import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-wrapper">
      <p className="loading-text">
        <span className="gradient-text">L</span>
        <span className="spin-letter">O</span>
        <span className="gradient-text">A</span>
        <span className="gradient-text">D</span>
        <span className="gradient-text">I</span>
        <span className="gradient-text">G</span>
        <span className="spin-letter">N</span>
      </p>
    </div>
  );
};

export default LoadingSpinner;
