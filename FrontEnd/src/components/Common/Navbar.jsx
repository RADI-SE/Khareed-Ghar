import React from "react";
import { FaSearch, FaShoppingCart, FaUser, FaXbox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "../../services/authService";
import { useFetchCartItems } from "../../hooks/buyer/cart/useFetchCartItems";

const Navbar = () => {
  const { signout } = useAuthService();

  const id = sessionStorage.getItem("id");

  const {
    data: cart = {},
  } = useFetchCartItems(id);

  const items = cart.items || [];
  const totalAmount = cart.totalAmount || 0;


  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth/signin");
  };

  const handleLogout = async () => {
    await signout();
    navigate("/");
  };
  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
          <div className="text-lg font-bold">
            <button onClick={() => navigate("/")}>Khareed-Ghar</button>
          </div>
          <div className="relative flex-1 mx-4">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Search"
                className="w-full border py-2 px-4"
              />
              <FaSearch className="absolute top-3 right-3 text-blue-900" />
            </form>
          </div>
          <div className="flex items-center space-x-4">
          <button onClick={() => navigate("/cart")} className="relative">
              <FaShoppingCart className="text-lg text-blue-900 hover:text-blue-500" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs w-4 h-4 bg-red-600 rounded-full flex justify-center items-center text-white">
                  {items.length}
                </span>
              )}
            </button>
            <button className="hidden md:block" onClick={handleLogin}>
              Login | Register
            </button>
            <button className="hidden md:block" onClick={handleLogout}>
              Logout
            </button>
            <button className="block md:hidden">
              <FaUser />
            </button>
            <button className="block md:hidden">
              <FaXbox />
            </button>
          </div>
        </div>
        <div className="bg-blue-900 text-white flex items-center justify-center space-x-10 py-4 text-sm font-bold">
          <button onClick={() => navigate("/")} className="hover:underline">
            Home
          </button>
          <button onClick={() => navigate("/cart")} className="hover:underline">
            Cart
          </button>
          <button onClick={() => navigate("/sell")} className="hover:underline">
            Sell
          </button>
        </div>
      </nav>     
    </>
  );
};

export default Navbar;
