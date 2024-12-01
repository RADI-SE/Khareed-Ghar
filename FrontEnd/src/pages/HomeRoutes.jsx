import React from "react";
import CategoryBar from "../components/Common/CategoryBar";
import Home from "./MainPage/Home";
import HomeLayout from "../components/layouts/HomeLayout";
import NotFound from "../components/NotFound";
import { Outlet } from "react-router-dom";
const HomeRoutes = () => {
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  );
};

export const homeRoutes = [
  { path: "/", element: <Home /> },
  { path: "/", element: <CategoryBar /> },
  { path: "*", element: <NotFound /> },
];

export default HomeRoutes;
