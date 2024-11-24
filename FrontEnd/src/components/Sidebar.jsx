import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./components.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <nav className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-sticky">
          <h4 className="sidebar-heading">Admin Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/dashboard">
                Dashboard
              </NavLink>
            </li>
           
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/users">
                User Management
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/orders">
                Order Management
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/categories">
                Category Management
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/products">
                Product Management
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
