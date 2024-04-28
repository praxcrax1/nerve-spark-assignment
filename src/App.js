
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserSelectionPage from "./components/UserSelectionPage";
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage";
import DashboardUser from "./components/DashboardUser";
import DashboardDealership from "./components/DashboardDealership";
import PasswordChange from "./components/PasswordChange";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSelectionPage />} />
        <Route path="/login/:userType" element={<LoginPage />} />
        <Route path="/signup/:userType" element={<SignupPage />} />
        <Route path="/dashboard/user/:email" element={<DashboardUser userType="user" />} />
        <Route path="/dashboard/dealership/:email" element={<DashboardDealership userType="dealership" />}/>
        <Route
          path="/change-password/:email"
          element={<PasswordChange />}
        />
      </Routes>
    </Router>
  );
};

export default App;
