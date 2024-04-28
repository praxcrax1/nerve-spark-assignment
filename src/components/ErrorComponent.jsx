// ErrorComponent.js
import React from "react";
import { useLoading } from "./LoadingContext";
import "./ErrorComponent.css"; // Import CSS file for styling

const ErrorComponent = () => {
  const { error } = useLoading();

  return error ? (
    <div className="error-box">
      {/* Add a container with error styling */}
      Error: {error}
    </div>
  ) : null;
};

export default ErrorComponent;
