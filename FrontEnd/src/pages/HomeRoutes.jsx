import React from "react";
import Home from "./MainPage/Home";
import HomeLayout from "../components/layouts/HomeLayout";
import NotFound from "../components/NotFound";
import { Outlet } from "react-router-dom";
import Cart from "../pages/MainPage/Cart";
import Checkout from "../components/Common/Checkout";
import OrderConfirmation from "../components/Common/OrderConfirmation";
import FilterData from "../components/Common/FilterData";
import ProductDetail from "../components/Common/ProductDetail";
import AllCategoryProducts from "../components/Common/products";

const HomeRoutes = ({ setOrder, order }) => {
  return (
    <HomeLayout>
      <Outlet context={{ order, setOrder }} />
    </HomeLayout>
  );
};

export const homeRoutes = [
  { path: "/", element: <Home /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/order-confirmation", element: <OrderConfirmation /> },
  { path: "/filter-data", element: <FilterData /> },
  { path: "/products/:id", element: <ProductDetail /> },
  { path: "/collection/:id", element: <AllCategoryProducts /> },
  { path: "*", element: <NotFound /> },
];

export default HomeRoutes;
