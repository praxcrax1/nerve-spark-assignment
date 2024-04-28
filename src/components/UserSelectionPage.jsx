import React from "react";
import { Link } from "react-router-dom";

const UserSelectionPage = () => {
  return (
    <div className="box">
      <div>
        <h2>CHOOSE YOUR ROLE</h2>
        <button className="user-button">
          <Link to="/login/user">USER</Link>
        </button>
        <button className="dealership-button">
          <Link to="/login/dealership">DEALERSHIP</Link>
        </button>
      </div>
    </div>
  );
};

export default UserSelectionPage;
