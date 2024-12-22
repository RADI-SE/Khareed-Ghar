// AdminLayout.jsx
import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Outlet } from "react-router-dom"; // This renders the route content inside the layout

const AdminLayout = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="lg:col-span-1">
        <Sidebar /> {/* Sidebar will stay constant */}
      </div>
      <div className="lg:col-start-2 lg:col-span-3 m-4">
        <Outlet /> {/* This renders the content based on the route */}
      </div>
    </div>
  );
};

export default AdminLayout;
