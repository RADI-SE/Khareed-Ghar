import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../components.css";

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
          <h4 className="sidebar-heading">Seller Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link" to="/seller/dashboard">
                Dashboard
              </NavLink>
            </li>
           
            <li className="nav-item">
              <NavLink className="nav-link" to="/seller/users">
                User Management
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/seller/orders">
                Order Management
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/seller/categories">
                Category Management
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/seller/products">
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
