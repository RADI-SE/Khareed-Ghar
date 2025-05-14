import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout";
import { DashBoardView } from "../components/admin/DashBoardComponents/DashBoardView";
import CategoryManagement from "../components/admin/Category/rootRoutes";
import OrderDetails from "../components/admin/OrderComponents/OrderDetails";
import UserManagement from "../components/admin/User/rootRoutes";
import OrderList from "../components/admin/OrderComponents/OrderList";
import NotFound from "../components/NotFound";
import RegionManagement from "../components/admin/Region/rootRoutes";
import ProductManagement from "../components/admin/Product/rootRoutes";
import CarouselEditor from "../components/admin/SlideImageChanger/CarouselEditor";
import AdminProfile from "../components/admin/AdminProfile";
const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

const AdminRoutesWrapper = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminRoutes />}>
        <Route index element={<DashBoardView />} />
        <Route path="dashboard" element={<DashBoardView />} />
        <Route path="carousel" element={<CarouselEditor />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/order-details" element={<OrderDetails />} />
        <Route path="users/*" element={<UserManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="zoneManager" element={<RegionManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutesWrapper;

