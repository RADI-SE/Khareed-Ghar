import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaBell, FaBars, FaTimes, FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useAuthService } from "../../services/authService";
import { useFetchCartItems } from "../../hooks/buyer/cart/useFetchCartItems";
import { useClearCart } from "../../hooks/buyer/cart/useClearCart";
import { useFetchNotifications } from '../../hooks/buyer/Notifications/useFetchNotifications'
import { useSellerService } from '../../services/seller/sellerServices'

const Navbar = () => {

  const [showNotifications, setShowNotifications] = useState(false);
  const { signout, isAuthenticated, user } = useAuthService();
  const { mutate: clearCartMutation } = useClearCart();
  const { data: cart = {} } = useFetchCartItems();
  const items = cart?.items || [];
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {updateBuyerNotification} = useSellerService();
  const { data = [], isLoading, isError } = useFetchNotifications();

  // Sort notifications by creation date in descending order
  const sortedNotifications = [...data].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  console.log("data", data);
  const handleLogin = () => {
    navigate("/auth/signin");
  }; 

  const handleLogout = async () => {
    await signout();
    clearCartMutation();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleUpdateNotification = async (id) => {
    console.log("id", id);
    const read = true;
    await updateBuyerNotification(id, read);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate("/")} 
              className="text-xl md:text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors"
            >
              Khareed-Ghar
            </button>
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={(e) => e.preventDefault()} className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => navigate("/cart")} 
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaShoppingCart className="w-6 h-6 text-blue-900" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaBell className="w-6 h-6 text-blue-900" />
              {data.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {data.length}
                      </span>
                    )}
            </button>
            {/* Notification Dropdown */}
            {showNotifications && (
                    <div className="absolute right-1 top-10 h-[500px] w-80 bg-white rounded-lg shadow-lg overflow-y-auto z-10">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                      </div>
                      <div className="">
                        {sortedNotifications.map((notification) => (
                          <Link
                          onClick={() => handleUpdateNotification(notification?._id)}
                          key={notification?._id}
                          className={`no-underline ${notification?.read ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'}`}>
                          <div
                            key={notification._id}
                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-start"
                          >
                            <div>
                              <p className="text-sm text-gray-800">{notification?.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification?.createdAt}</p>
                            </div>
                          </div>
                          </Link>
                        ))}
                      </div>
                      <div>
                        
                      </div>
                      {data.length === 0 && (
                        <div className="px-4 py-3 text-sm text-gray-500">
                          No new notifications
                        </div>
                      )}
                    </div>
                  )}

            {!isAuthenticated ? (
              <button
                onClick={handleLogin}
                className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Login | Register
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hi, {user?.name || 'User'}</span>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-2 border border-blue-900 bg-blue-800 text-white rounded-lg hover:bg-blue-700 hover:border-blue-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                >
                  <FaSearch className="w-5 h-5" />
                </button>
              </form>

              {/* Mobile Navigation Items */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => navigate("/cart")} 
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaShoppingCart className="w-6 h-6 text-blue-900" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </button>

                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaBell className="w-6 h-6 text-blue-900" />
                  {data.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {data.length}
                      </span>
                    )}
                </button>
                {/* Mobile Notification Dropdown */}
            {showNotifications && (
                    <div className="absolute right-1 top-10 h-auto w-80 bg-white rounded-lg shadow-lg overflow-y-auto">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                      </div>
                      <div className="">
                        {sortedNotifications.map((notification) => (
                          <Link
                          onClick={() => handleUpdateNotification(notification?._id)}
                          key={notification?._id}
                          className={`no-underline ${notification?.read ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'}`}>
                          <div
                            key={notification._id}
                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-start"
                          >
                            <div>
                              <p className="text-sm text-gray-800">{notification?.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification?.createdAt}</p>
                            </div>
                          </div>
                          </Link>
                        ))}
                      </div>
                      <div>
                        
                      </div>
                      {data.length === 0 && (
                        <div className="px-4 py-3 text-sm text-gray-500">
                          No new notifications
                        </div>
                      )}
                    </div>
                  )}

                {!isAuthenticated ? (
                  <button
                    onClick={handleLogin}
                    className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Login | Register
                  </button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Hi, {user?.name || 'User'}</span>
                    <button 
                      onClick={handleLogout}
                      className="px-6 py-2 border border-blue-900 bg-blue-800 text-white rounded-lg hover:bg-blue-700 hover:border-blue-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-gradient-to-r from-white to-blue-500 hidden lg:block md:block z-0">
      <div className="flex justify-between mx-auto px-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">
            
          </h2>
        </div>
        <button
          onClick={""}
          className="bg-white text-blue-900 hover:bg-indigo-100 font-medium py-2 px-6 rounded-full transition duration-300 ease-in-out transform border border-4 border-blue-900 hover:scale-105"
        >
          BECOME A SELLER!
        </button>
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
