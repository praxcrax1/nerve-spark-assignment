// LoadingContext.js
import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  const setErrorState = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <LoadingContext.Provider
      value={{ loading, error, setLoadingState, setErrorState }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
