// AdminLayout.jsx
import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';  // This renders the route content inside the layout

const AdminLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar /> {/* Sidebar will stay constant */}
      <div className="admin-content">
        <Outlet />  {/* This renders the content based on the route */}
      </div>
    </div>
  );
};

export default AdminLayout;
