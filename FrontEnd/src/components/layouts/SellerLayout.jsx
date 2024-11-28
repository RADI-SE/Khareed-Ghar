
import React from 'react';
import Sidebar from '../../components/seller/Sidebar';
import { Outlet } from 'react-router-dom';  

const SellerLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />  
      <div className="admin-content">
        <Outlet />   
      </div>
    </div>
  );
};

export default SellerLayout;
