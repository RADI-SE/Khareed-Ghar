import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaXbox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import { useAuthService } from "../../services/authService";
import { useFetchCategories } from "../../hooks/Categories/useFetchCategories";

const Navbar = () => {
  const { signout } = useAuthService();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data: categories = [],
  } = useFetchCategories();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    navigate('/auth/signin'); 
  };

  const handleLogout = async () => {
    await signout();
    navigate('/'); 
  };

  const handleCategoryClick = (categoryPath) => {

    navigate(`/category/${categoryPath}`);  
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <button onClick={() => navigate('/')}>Khareed-Ghar</button>
        </div>
        <div className="relative flex-1 mx-4">
          <form
            onSubmit={(e) => e.preventDefault()} 
          >
            <input
              type="text"
              placeholder="Search"
              className="w-full border py-2 px-4"
            />
            <FaSearch className="absolute top-3 right-3 text-blue-900" />
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/cart')}>
            <FaShoppingCart className="text-lg" />
          </button>
          <button className="hidden md:block" onClick={handleLogin}>Login | Register</button>
          <button className="hidden md:block" onClick={handleLogout}>Logout</button>
          <button className="block md:hidden">
            <FaUser />
          </button>
          <button className="block md:hidden">
            <FaXbox />
          </button>
        </div>
      </div>
      <div className="bg-blue-900 text-white flex items-center justify-center space-x-10 py-4 text-sm font-bold">
        <button onClick={() => navigate('/')} className="hover:underline">
          Home
        </button>
        <button onClick={() => navigate('/cart')} className="hover:underline">
          Cart
        </button>
        <button onClick={() => navigate('/sell')} className="hover:underline">
          Sell
        </button>
        {/* Categories Button with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="icon-link icon-link-hover" 
          >
            Categories
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 ">
              <ul className="py-1">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => handleCategoryClick(category.name)}  // Navigate to the category page
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
