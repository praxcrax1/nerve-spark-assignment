import React, { useState } from "react";
import { Link, useNavigate , useParams } from "react-router-dom";

const LoginPage = () => {
  const { userType } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://nerve-spark-backend.onrender.com/api/login/${userType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      setMessage(data.message);
      if (data.message === "Login successful"){
        navigate(`/dashboard/${userType}/${email}`);
      } 
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="box">
      <h2>Login as {userType}</h2>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to={`/signup/${userType}`}>Sign up</Link>
      </p>
      <p>{message}</p>
    </div>
  );
};

export default LoginPage;
