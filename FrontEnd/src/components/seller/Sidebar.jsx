import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthService } from "../../services/authService";
import {FaBell, FaBars, FaTimes} from "react-icons/fa";

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
    <div className="relative">
      {/* Mobile Toggle Button */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-950 text-white lg:hidden"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-all duration-300 transform ${
          isCollapsed ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 bg-blue-950`}
      >
        <div className="h-full pr-3 py-4 overflow-y-auto">
          <ul className="space-y-4 font-medium">
            <li>
              <h4 className="text-white mb-10 text-xl font-bold">Seller Panel</h4>
            </li>
            <li>
              <NavLink 
                className={({ isActive }) => 
                  `flex items-center py-3 px-1 text-white rounded-lg hover:bg-blue-800 transition-colors no-underline ${
                    isActive ? 'bg-blue-800' : ''
                  }`
                }
                to="/seller/dashboard"
                onClick={() => window.innerWidth < 1024 && setIsCollapsed(false)}
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink 
                className={({ isActive }) => 
                  `flex items-center py-3 px-1 text-white rounded-lg hover:bg-blue-800 transition-colors no-underline ${
                    isActive ? 'bg-blue-800' : ''
                  }`
                }
                to="/seller/orders"
                onClick={() => window.innerWidth < 1024 && setIsCollapsed(false)}
              >
                Order Management
              </NavLink>
            </li>
            <li>
              <NavLink 
                className={({ isActive }) => 
                  `flex items-center py-3 px-1 text-white rounded-lg hover:bg-blue-800 transition-colors no-underline ${
                    isActive ? 'bg-blue-800' : ''
                  }`
                }
                to="/seller/products"
                onClick={() => window.innerWidth < 1024 && setIsCollapsed(false)}
              >
                Product Management
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => 
                  `flex items-center py-3 px-1 text-white rounded-lg hover:bg-blue-800 transition-colors no-underline ${
                    isActive ? 'bg-blue-800' : ''
                  }`
                }
                to="/seller/notifications"
                onClick={() => window.innerWidth < 1024 && setIsCollapsed(false)}
              >
                <span className="flex-1">Notification</span>
                <FaBell className="w-5 h-5" />
              </NavLink>
            </li>
            <li className="mt-10">
              <button 
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
                onClick={handleLogout}
              >
                LOGOUT 
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
