// ErrorComponent.js
import React from "react";
import { useLoading } from "./LoadingContext";

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
