import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="grid grid-cols-4 gap-1 h-lvh">
      <div className="md:col-span-4 h-lvh">
        <button className="lg:hidden" onClick={toggleSidebar}>
          ☰
        </button>
        <nav
          className={`${
            isCollapsed ? "collapsed" : ""
          }  h-lvh hidden sm:block lg:fixed top-0 left-0 z-40 w-25 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-blue-950`}
        >
          <div className="h-full px-3 py-4 overflow-y-auto">
            <h4 className="text-white mb-5 text-center">Admin Panel</h4>
            <ul className="space-y-2 font-medium">
              <li className="nav-item">
                <NavLink className="no-underline text-white flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-800 group" to="/admin/dashboard">
                  Dashboard
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="no-underline text-white flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-800 group" to="/admin/users">
                  User Management
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="no-underline text-white flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-800 group" to="/admin/orders">
                  Order Management
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="no-underline text-white flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-800 group" to="/admin/categories">
                  Category Management
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="no-underline text-white flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-800 group" to="/admin/products">
                  Product Management
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="no-underline text-white flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-800 group" to="/admin/zoneManager">
                  Region Management
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
