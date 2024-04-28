import React, { useState } from "react";
import { useParams } from "react-router-dom";

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { email } = useParams();


  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error("Error during password change:", error);
      setLoading(false);
      setMessage("Failed to change password");
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
        <button type="submit" disabled={loading}>
          Change Password
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default PasswordChange;
