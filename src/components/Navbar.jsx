import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userEmail , userType }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  const changePassword = async () => {
      navigate(`/change-password/${userEmail}`)
  }

  return (
    <nav className={userType === "user" ? "user-navbar navbar" : "dealership-navbar navbar"}>
      <div className="navbar-left">
        <span>Welcome, {userEmail}</span>
      </div>
      <div className="navbar-right">
        <button onClick={changePassword}>Change Password</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
