// ErrorComponent.js
import React from "react";
import { useLoading } from "./LoadingContext";

const ErrorComponent = () => {
  const { error } = useLoading();

  return error ? <div>Error: {error}</div> : null;
};

export default ErrorComponent;
