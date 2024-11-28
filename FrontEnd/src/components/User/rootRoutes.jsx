import React from "react";
import { Routes, Route } from "react-router-dom";
import UserCards from "./UsersCards";
import User from "./view/User";
import UserProfileView from "./view/UserProfileView";

function UserManagement() {
  return (
    <div className="user-management">
      <Routes>
        <Route path="/" element={<UserCards />} />
        <Route path="/mod" element={<User role="moderator" />} />
        <Route path="/seller" element={<User role="seller" />} />
        <Route path="/buyer" element={<User role="buyer" />} />
        <Route path="/user/:id" element={<UserProfileView />} />
      </Routes>
    </div>
  );
}

export default UserManagement;
