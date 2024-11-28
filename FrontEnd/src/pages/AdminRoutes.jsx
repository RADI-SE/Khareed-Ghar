import React from "react";
import { Outlet } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout";
import { DashBoardView } from "../components/DashBoardComponents/DashBoardView";
import CategoryManagement from "../components/Category/rootRoutes";
import OrderDetails from "../components/OrderComponents/OrderDetails";
import UserManagement from "../components/UserComponents/rootRoutes";
import OrderList from "../components/OrderComponents/OrderList";
import DetailedProductView from "../components/Category/dashboard/view";
import NotFound from "../components/NotFound";

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
  { path: "products/detailedProduct", element: <DetailedProductView /> },
  { path: "*", element: <NotFound /> }, 
];

export default AdminRoutes;
