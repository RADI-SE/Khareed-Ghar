import React, { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AdminRoutes, { adminChildrenRoutes } from "./pages/AdminRoutes";
import HomePage from "./pages/HomePage";
import { useAuthService } from "./services/authService";
import NotFound from "./components/NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthRoutes, { authRoutes } from "./pages/AuthRoutes";
import VerifyEmail from "./components/Auth/VerifyEmail";

const App = () => {
  const { isCheckingAuth, checkAuth, user, isAuthenticated } = useAuthService();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "admin/*",
      element:
        isAuthenticated && user?.role === "admin" ? (
          <AdminRoutes />
        ) : (
          <Navigate to="/" />
        ),
      children: adminChildrenRoutes,
    },
    {
      path: "auth/*",
      element: <AuthRoutes user={user} isAuthenticated={isAuthenticated} />, // Pass user and isAuthenticated as props here
      children: authRoutes,
    },
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
