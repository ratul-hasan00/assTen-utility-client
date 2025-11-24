import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-circle"></div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
