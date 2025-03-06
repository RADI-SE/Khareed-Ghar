import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAuthService } from "./services/authService";
import HomeRoutes from "./pages/HomeRoutes";
import AdminRoutes from "./pages/AdminRoutes";
import SellerRoutes from "./pages/SellerRoutes";
import AuthRoutes from "./pages/AuthRoutes";
import NotFound from "./components/NotFound";
import VerifyEmail from "./components/Auth/VerifyEmail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/MainPage/Cart";
import Checkout from "./components/Common/Checkout";
import CartRoutes from "./pages/CartRoutes";

const App = () => {
  const { isCheckingAuth, checkAuth, user, isAuthenticated } = useAuthService();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeRoutes order={order} setOrder={setOrder} />,
      children: [
      
        {
          path: "auctions",
          element: <Outlet />,
        },
         {
          path: "cart",
          element: <Outlet />,
        },

        {
          path: "filter-data",
          element: <Outlet />,
        },
        {
          path: "products/:id",
          element: <Outlet />,
        },

        {
          path: "collection/:id",
          element: <Outlet />,
        },
        {
          path: "*",
          element: <Outlet />,
        },
      ],
    },
    {
      path: "admin/*",
      element:
        isAuthenticated && user?.role === "admin" ? (
          <AdminRoutes />
        ) : (
          <Navigate to="/" />
        ),
      children: [
        { path: "", element: <Outlet /> },
        { path: "dashboard", element: <Outlet /> },
        { path: "orders", element: <Outlet /> },
        { path: "orders/order-details", element: <Outlet /> },
        { path: "users/*", element: <Outlet /> },
        { path: "categories", element: <Outlet /> },
        { path: "zoneManager", element: <Outlet /> },
        { path: "products", element: <Outlet /> },
        { path: "*", element: <Outlet /> },
      ],
    },
    {
      path: "seller/*",
      element:
        isAuthenticated && user?.role === "seller" ? (
          <SellerRoutes />
        ) : (
          <Navigate to="/" />
        ),
      children: [
        { path: "", element: <Outlet /> },
        { path: "dashboard", element: <Outlet /> },
        { path: "orders", element: <Outlet /> },
        { path: "orders/order-details", element: <Outlet /> },
        { path: "products", element: <Outlet /> },
        { path: "auctions", element: <Outlet /> },
        { path: "*", element: <Outlet /> },
      ],
    },
    {
      path: "auth/*",
      element: <AuthRoutes />,
      children: [
        {
          path: "signin",
          element: <Outlet />,
        },
        {
          path: "signup",
          element: <Outlet />,
        },

        {
          path: "forgot-password",
          element: <Outlet />,
        },
        {
          path: "reset-password/:token",
          element: <Outlet />,
        },

        {
          path: "email-sent-success",
          element: <Outlet />,
        },
        {
          path: "*",
          element: <Outlet />,
        },
      ],
    },
    {
      path: "checkout",
      element: <CartRoutes  order={order} setOrder={setOrder} />,
      children: [
        {
          path: "checkout",
          element: <Outlet />,
        },
        {
          path: "shipping",
          element: <Outlet />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
      
    },
    // {
    //   path: "cart",
    //   element: <CartRoutes order={order} setOrder={setOrder} />,
    //   children: [
    //     { path: "", element: <Outlet /> }, // `cart/`
    //     { path: "checkout", element: <Outlet /> }, // `cart/checkout`
    //     { path: "*", element: <NotFound /> },
    //   ],
    // },
    
    
    {
      path: "auth/verify-email",
      element:
        isAuthenticated && !user?.isVerified ? (
          <VerifyEmail />
        ) : (
          <Navigate to="/" />
        ),
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
