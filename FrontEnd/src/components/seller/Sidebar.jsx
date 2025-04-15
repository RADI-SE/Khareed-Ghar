import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthService } from "../../services/authService";
import {FaBell} from "react-icons/fa";
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { signout } = useAuthService();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    await signout();
    navigate("/signin");
  };

  return (
    <div className="grid grid-cols-4 gap-1 h-lvh">
      <div className="md:col-span-4 h-lvh">
        <button className="lg:hidden" onClick={toggleSidebar}>
          ☰
        </button>
        <nav className={`${isCollapsed ? "collapsed" : ""}  h-lvh hidden sm:block lg:fixed top-0 left-0 z-40 w-25 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-blue-950`}>
          <div className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-4 font-medium ">
              <li>
                <h4 className="text-white mb-10">Seller Panel</h4>
              </li>
              <li className="">
                <NavLink
                  className="border-blue-900 border-y no-underline text-white flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-800 group"
                  to="/seller/dashboard"
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="">
                <NavLink
                  className="border-blue-900 border-y no-underline text-white flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-800 group"
                  to="/seller/orders"
                >
                  Order Management
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  className="border-blue-900 border-y no-underline text-white flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-800 group"
                  to="/seller/products"
                >
                  Product Management
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  className="border-blue-900 border-y no-underline text-white flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-800 hover:text-white group"
                  to="/seller/notifications"
                >
                  Notification
                  <FaBell className="w-6 h-6 ml-4 text-white" />
                </NavLink>
              </li>
              <li>
                <button className=" mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleLogout}>
                  LOGOUT
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
