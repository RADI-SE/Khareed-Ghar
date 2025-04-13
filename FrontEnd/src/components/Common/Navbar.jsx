import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "../../services/authService";
import { useFetchCartItems } from "../../hooks/buyer/cart/useFetchCartItems";
import { useClearCart } from "../../hooks/buyer/cart/useClearCart";

const Navbar = () => {
  const { signout, isAuthenticated, user } = useAuthService();
  const { mutate: clearCartMutation } = useClearCart();
  const { data: cart = {} } = useFetchCartItems();
  const items = cart?.items || [];
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
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
              onClick={() => navigate("/notification")} 
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaBell className="w-6 h-6 text-blue-900" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>

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
                  onClick={() => navigate("/notification")} 
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaBell className="w-6 h-6 text-blue-900" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </button>

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
      <div className="bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 md:space-x-8 py-3 overflow-x-auto">
            <button 
              onClick={() => navigate("/")} 
              className="text-white hover:text-blue-200 font-medium transition-colors whitespace-nowrap"
            >
              Home
            </button>
            <button 
              onClick={() => navigate("/cart")} 
              className="text-white hover:text-blue-200 font-medium transition-colors whitespace-nowrap"
            >
              Cart
            </button>
            <button 
              onClick={() => navigate("/sell")} 
              className="text-white hover:text-blue-200 font-medium transition-colors whitespace-nowrap"
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
