// import React, { useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import SignInPage from "./pages/SignInPage";
// import SignUpPage from "./pages/SignUpPage";
// import VerifyEmailPage from "./pages/VerifyEmailPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import HomePage from "./pages/HomePage";
// import { useAuthService } from "./services/authService";
// import { AdminRoutes } from "./pages/AdminRoutes";
// import NotFound from './components/NotFound';
// function App() {
//   const { isCheckingAuth, checkAuth, user, isAuthenticated } = useAuthService();

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   if (isCheckingAuth) {
//     return <div>Loading...</div>; // Add a loading state while checking authentication
//   }

//   return (
//     <Router>
//       <Routes>
//         {/* Non-admin routes */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/signin" element={<SignInPage />} />
//         <Route path="/verify-email" element={<VerifyEmailPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />

//         {/* Admin Routes */}
//         <Route
//           path="/admin/*"
//           element={
//             isAuthenticated && user?.role === "admin" ? (
//               <AdminRoutes />
//             ) : (
//               <Navigate to="/signin" />
//             )
//           }
//         />

//         {/* Catch-all route */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
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
import SignInPage from "./pages/SignInPage";
import { useAuthService } from "./services/authService";
import NotFound from "./components/NotFound";

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
      path: "signin",
      element: <SignInPage />,
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
    </QueryClientProvider>
  );
};

export default App;
