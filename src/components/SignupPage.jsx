import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLoading } from "./LoadingContext";

const SignupPage = () => {
  const { userType } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setLoadingState, setErrorState } = useLoading();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingState(true); // Set loading state to true
    setErrorState(null); // Reset error state

    try {
      const response = await fetch(
        `https://nerve-spark-backend.onrender.com/api/signup/${userType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.message === "User already exists") {
        setMessage("User already exists");
      } else {
        navigate(`/dashboard/${userType}/${email}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorState("An error occurred"); // Set error message
    } finally {
      setLoadingState(false); // Set loading state back to false
    }
  };

  return (
    <div className="box">
      <h2>Sign up as {userType}</h2>
      <form
        onSubmit={handleSubmit}
        className={
          userType === "user" ? "user form-items" : "dealership form-items"
        }>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign up</button>
      </form>
      <p>
        Already have an account? <Link to={`/login/${userType}`}>Login</Link>
      </p>
      <p>{message}</p>
    </div>
  );
};

export default SignupPage;
