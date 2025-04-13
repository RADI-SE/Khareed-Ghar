import { Routes, Route, Outlet } from "react-router-dom";
import HomeLayout from "../components/layouts/HomeLayout";
import NotFound from "../components/NotFound";
import Checkout from "../components/Common/Checkout";
import Shipping from "./MainPage/shipping";
import Review from "./MainPage/Review";

export const CartRoutes = ({ setOrder, order }) => {
  return (
    <HomeLayout>
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
        <Route path="shipping" element={<Shipping />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="review" element={<Review />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default CartRoutesWrapper;
