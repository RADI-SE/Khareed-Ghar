import React from "react";
import { Outlet } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout";
import { DashBoardView } from "../components/admin/DashBoardComponents/DashBoardView";
import CategoryManagement from "../components/admin/Category/rootRoutes";
import OrderDetails from "../components/admin/OrderComponents/OrderDetails";
import UserManagement from "../components/admin/User/rootRoutes";
import OrderList from "../components/admin/OrderComponents/OrderList";
import DetailedProductView from "../components/admin/Category/dashboard/view";
import NotFound from "../components/NotFound";
import RegionManagement from "../components/admin/Region/rootRoutes";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export const adminChildrenRoutes = [
  { index: true, element: <DashBoardView /> }, // Default route
  { path: "dashboard", element: <DashBoardView /> },
  { path: "orders", element: <OrderList /> },
   {path:"orders/order-details", element:<OrderDetails />},
   { path: "users/*", element: <UserManagement /> }, 
   { path: "categories", element: <CategoryManagement/> },
   { path: "zoneManager", element: <RegionManagement /> },
  { path: "products/detailedProduct", element: <DetailedProductView /> },
  { path: "*", element: <NotFound /> }, 
];

export default AdminRoutes;
