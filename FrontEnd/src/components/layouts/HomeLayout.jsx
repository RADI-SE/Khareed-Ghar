import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import CategoryBar from "../Common/CategoryBar";

const HomeLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="home-layout">
      <Navbar />
      <CategoryBar />    
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;