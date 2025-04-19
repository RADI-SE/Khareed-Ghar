import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Outlet } from "react-router-dom"; // This renders the route content inside the layout
import NavbarAdmin from "../admin/NavbarAdmin";

const AdminLayout = () => {
  return (    
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-end bg-gray-600 h-[50px]">
         <NavbarAdmin />
      </div>
      <div className="flex flex-1">
        <div className="lg:w-64">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden z-100">
          <Outlet />
        </main>
      </div>
    </div> 
    
  );
};

export default AdminLayout;
