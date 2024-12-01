
import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
const HomeLayout = () => {
  return (
    <div className="home-layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
