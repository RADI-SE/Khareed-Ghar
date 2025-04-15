import React from "react";
import Sidebar from "../../components/seller/Sidebar";
import { Outlet } from "react-router-dom";

const SellerLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-64">
        <Sidebar />
      </div>
      <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;
