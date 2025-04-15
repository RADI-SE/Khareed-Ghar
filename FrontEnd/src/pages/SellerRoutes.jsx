import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import SellerLayout from "../components/layouts/SellerLayout";
import { DashBoardView } from "../components/seller/DashBoardComponents/DashBoardView";
import ProductManagement from "../components/seller/Product/rootRoutes";
import OrderDetails from "../components/seller/OrderComponents/OrderDetails";
import OrderList from "../components/seller/OrderComponents/OrderList";
import NotFound from "../components/NotFound"; 
import Notifications from "../components/seller/Notifications/Notifications";

const SellerRoutes = () => {
  return (
    <SellerLayout>
      <Outlet />
    </SellerLayout>
  );
};

const SellerRoutesWrapper = () => {
  return (
    <Routes>
     <Route path="/" element={<SellerRoutes />}>
      <Route index element={<DashBoardView />} />
      <Route path="dashboard" element={<DashBoardView />} />
      <Route path="orders" element={<OrderList />} />
      <Route path="orders/order-details" element={<OrderDetails />} />
      <Route path="products" element={<ProductManagement />} /> 
      <Route path="notifications" element={<Notifications />} />
      <Route path="*" element={<NotFound />} />
     </Route>
    </Routes>
  );
};

export default SellerRoutesWrapper;
