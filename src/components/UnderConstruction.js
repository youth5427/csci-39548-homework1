import React from "react";
import { useNavigate } from "react-router-dom";
import "./UnderConstruction.css";

function UnderConstruction() {
  const navigate = useNavigate();

  return (
    <div className="construction-page">
      <h1>🚧 Page Under Construction 🚧</h1>
      <p>This page is currently under development. Please check back later!</p>
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Go Back
      </button>
    </div>
  );
}

export default UnderConstruction;
