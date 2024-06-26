// LoadingSpinner.js
import React from "react";
import { useLoading } from "./LoadingContext";


const LoadingSpinner = () => {
  const { loading } = useLoading();

  return loading ? (
    <div className="loading-spinner-overlay">
      {" "}
      {/* Add a container with fixed positioning */}
      <div className="loading-spinner">Loading...</div>{" "}
      {/* Add the loading spinner */}
    </div>
  ) : null;
};

export default LoadingSpinner;
