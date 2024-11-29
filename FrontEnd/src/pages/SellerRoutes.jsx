import React from "react";
import { Outlet } from "react-router-dom";
import SellerLayout from "../components/layouts/SellerLayout";
import { DashBoardView } from "../components/seller/DashBoardComponents/DashBoardView";
import CategoryManagement from "../components/seller/Category/rootRoutes";
import ProductManagement from "../components/seller/Product/rootRoutes";
import OrderDetails from "../components/seller/OrderComponents/OrderDetails";
import UserManagement from "../components/seller/User/rootRoutes";
import OrderList from "../components/seller/OrderComponents/OrderList";
import DetailedProductView from "../components/seller/Category/dashboard/view";
import NotFound from "../components/NotFound";

const SellerRoutes = () => {
  return (
    <SellerLayout>
      <Outlet />
    </SellerLayout>
  );
};

export const sellerChildrenRoutes = [
  { index: true, element: <DashBoardView /> },
  { path: "dashboard", element: <DashBoardView /> },
  { path: "orders", element: <OrderList /> },
   {path:"orders/order-details", element:<OrderDetails />},
   { path: "users/*", element: <UserManagement /> }, 
   { path: "categories", element: <CategoryManagement/> },
   { path: "products", element: <ProductManagement/> },
  { path: "products/detailedProduct", element: <DetailedProductView /> },
  { path: "*", element: <NotFound /> }, 
];

export default SellerRoutes;
