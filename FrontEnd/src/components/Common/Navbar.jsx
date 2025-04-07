import React from "react";
import { FaSearch, FaShoppingCart, FaUser, FaBell } from "react-icons/fa";
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

  const handleLogin = () => {
    navigate("/auth/signin");
  };

  const handleLogout = async () => {
    await signout();
    clearCartMutation();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => navigate("/")} 
              className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors"
            >
              Khareed-Ghar
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
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
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-6">
            {/* Cart Button */}
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

            {/* Notification Button */}
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

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
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
                    className="px-6 py-2 border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaUser className="w-6 h-6 text-blue-900" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 py-3">
            <button 
              onClick={() => navigate("/")} 
              className="text-white hover:text-blue-200 font-medium transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => navigate("/cart")} 
              className="text-white hover:text-blue-200 font-medium transition-colors"
            >
              Cart
            </button>
            <button 
              onClick={() => navigate("/sell")} 
              className="text-white hover:text-blue-200 font-medium transition-colors"
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
