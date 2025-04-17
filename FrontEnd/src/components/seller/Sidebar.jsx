import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthService } from "../../services/authService";
import {FaBell, FaBars, FaTimes} from "react-icons/fa";
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

  const handleLogout = async () => {
    await signout();
    navigate("/signin");
  };

  const handleUpdateNotification = async (id) => {
    console.log("id", id);
    const read = true;
    await updateNotification(id, read);
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
              <h4 className="text-white mb-10 text-xl font-bold flex items-center justify-between">
                Seller Panel
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="text-white hover:text-blue-300 transition-colors"
                  >
                    <FaBell className="w-5 h-5" />
                    {data.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {data.length}
                      </span>
                    )}
                  </button>
                  
                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg py-2">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {data.map((notification) => (
                          <Link
                          onClick={() => handleUpdateNotification(notification?._id)}
                          key={notification?._id}
                          className={`no-underline ${notification?.read ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'}`}>
                          <div
                            key={notification._id}
                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                          >
                            <p className="text-sm text-gray-800">{notification?.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification?.createdAt}</p>
                          </div>
                          </Link>
                        ))}
                      </div>
                      {data.length === 0 && (
                        <div className="px-4 py-3 text-sm text-gray-500">
                          No new notifications
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </h4>
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
