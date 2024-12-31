import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import CategoryBar from "../Common/CategoryBar";

const HomeLayout = () => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  return (
    <div className="home-layout">
      <Navbar />
      {isCartPage ? (
        <div className="cart-layout">
          <div className="cart-content">
            <Outlet />
          </div>
        </div>
      ) : (
        <>
          <CategoryBar />
          <Outlet />
        </>
      )}
      <Footer />
    </div>
  );
};

export default HomeLayout;
