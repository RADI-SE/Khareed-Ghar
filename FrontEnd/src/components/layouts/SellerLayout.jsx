import React from "react";
import Sidebar from "../../components/seller/Sidebar";
import { Outlet } from "react-router-dom";

const SellerLayout = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-start-2 col-span-3 m-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;
