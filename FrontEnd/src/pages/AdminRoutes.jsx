import React from "react";
import { Outlet } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import {DashBoardViewPage} from "./DashBoardPages/DashBoardViewPage";
import {UserManagementPage} from "./UsersPages/UserManagementPage";
import CategoryManagementPage from "../pages/ProductPages/CategoryManagementPage";
import OrderManagementPanell from "./OrdersPages/OrderManagementPanell";
import UserModerator from "../components/UserComponents/UserModerator";
import UserSellers from "../components/UserComponents/UserSellers";
import UserProfileView from "../components/UserComponents/UserProfileView";
import DetailedProductView from "../components/CategoryComponents/DetailedProductView";
import NotFound from "../components/NotFound";
import Dashboard from "../components/Dashboard";
import UserBuyer from "../components/UserComponents/UserBuyer";
import EditUser from "../components/UserComponents/EditUser";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export const adminChildrenRoutes = [
  { index: true, element: <DashBoardViewPage /> }, // Default route
  { path: "dashboard", element: <DashBoardViewPage /> },
  { path: "orders", element: <OrderManagementPanell /> },
  { path: "users", element: <UserManagementPage /> },
  { path: "users/mod", element: <UserModerator /> },
  { path: "users/seller", element: <UserSellers /> },
  { path: "users/buyer", element: <UserBuyer /> },
  { path: "users/user/:id", element: <UserProfileView /> },
  { path: "users/edit/:id", element: <EditUser /> },
  { path: "categories", element: <CategoryManagementPage /> },
  { path: "products/detailedProduct", element: <DetailedProductView /> },
  { path: "*", element: <NotFound /> }, // Catch-all route
];

export default AdminRoutes;
