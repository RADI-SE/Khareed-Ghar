import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthService } from "../../services/authService";
import {FaBell, FaBars, FaTimes, FaCheck} from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useFetchNotifications } from '../../hooks/seller/Notifications/useFetchNotifications'
import { Link } from 'react-router-dom'
import { useSellerService } from '../../services/seller/sellerServices'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { signout } = useAuthService();

  const {updateNotification} = useSellerService();
  const { data = [], isLoading, isError } = useFetchNotifications();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative z-50">
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
              <h4 className="text-white mb-10 text-xl font-bold flex items-center justify-between">
                Seller Panel
              </h4>
            </li>
            <li>
              <NavLink 
                className={({ isActive }) => 
                  `flex items-center py-3 px-1 text-white rounded-sm hover:bg-blue-800 transition-colors no-underline ${
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
                  `flex items-center py-3 px-1 text-white hover:bg-blue-800 transition-colors no-underline ${
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
                  `flex items-center py-3 px-1 text-white hover:bg-blue-800 transition-colors no-underline ${
                    isActive ? 'bg-blue-800' : ''
                  }`
                }
                to="/seller/products"
                onClick={() => window.innerWidth < 1024 && setIsCollapsed(false)}
              >
                Product Management
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
