import React from "react";
import { Outlet } from "react-router-dom";

function RootAuthRoutes() {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
}

export default RootAuthRoutes;
