import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "./LoadingContext";

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setLoadingState, setErrorState } = useLoading();
  const { email } = useParams();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoadingState(true); // Set loading state to true
    setErrorState(null); // Reset error state

    try {
      const response = await fetch(
        `https://nerve-spark-backend.onrender.com/api/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, oldPassword, newPassword }),
        }
      );
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error during password change:", error);
      setErrorState("Failed to change password"); // Set error message
    } finally {
      setLoadingState(false); // Set loading state back to false
    }
  };

  return (
    <div className="box">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword} className="form-items">
        <label>Old Password:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <br />
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Change Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default PasswordChange;
