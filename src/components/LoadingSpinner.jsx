// LoadingSpinner.js
import React from "react";
import { useLoading } from "./LoadingContext";

const LoadingSpinner = () => {
  const { loading } = useLoading();

  return loading ? <div>Loading...</div> : null;
};

export default LoadingSpinner;
