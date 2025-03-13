import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./MainPage/Home";
import HomeLayout from "../components/layouts/HomeLayout";
import NotFound from "../components/NotFound";
import Cart from "./MainPage/Cart";
import Checkout from "../components/Common/Checkout";
import OrderConfirmation from "../components/Common/OrderConfirmation";
import Shipping from "./MainPage/shipping";

export const CartRoutes = ({ setOrder, order }) => {
  return (
    <HomeLayout>
      {/* Outlet provides access to child routes */}
      <Outlet context={{ order, setOrder }} />
    </HomeLayout>
  );
};
const CartRoutesWrapper = ({ setOrder, order }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<CartRoutes setOrder={setOrder} order={order} />}
      >
        <Route path="checkout" element={<Checkout />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default CartRoutesWrapper;
