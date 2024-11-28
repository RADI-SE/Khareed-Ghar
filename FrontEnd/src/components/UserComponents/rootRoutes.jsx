import React from "react";
import { Routes, Route } from "react-router-dom";
import UserCards from "./UsersCards";
import UserModerator from "./UserModerator";
import UserSellers from "./UserSellers";
import UserBuyer from "./UserBuyer";
import UserProfileView from "./UserProfileView";

function UserManagement() {
  return (
    <div className="user-management">
      <Routes>
        <Route path="/" element={<UserCards />} />
        <Route path="/mod" element={<UserModerator />} />
        <Route path="/seller" element={<UserSellers />} />
        <Route path="/buyer" element={<UserBuyer />} />
        <Route path="/user/:id" element={<UserProfileView />} />
      </Routes>
    </div>
  );
}

export default UserManagement;
