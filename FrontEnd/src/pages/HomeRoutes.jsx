import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./MainPage/Home";
import HomeLayout from "../components/layouts/HomeLayout";
import NotFound from "../components/NotFound";
import Cart from "../pages/MainPage/Cart";
import Checkout from "../components/Common/Checkout";
import OrderConfirmation from "../components/Common/OrderConfirmation";
import FilterData from "../components/Common/FilterData";
import ProductDetail from "../components/Common/ProductDetail";
import AllCategoryProducts from "../components/Common/products";
import AuctionListPage from "./AuctionListPage";

export const HomeRoutes = ({ setOrder, order }) => {
  return (
    <HomeLayout>
      {/* Outlet provides access to child routes */}
      <Outlet context={{ order, setOrder }} />
    </HomeLayout>
  );
};
const HomeRoutesWrapper = ({ setOrder, order }) => {
  return (
    <Routes>
      <Route path="/" element={<HomeRoutes setOrder={setOrder} order={order} />}>
        <Route index element={<Home />} />
        <Route path="auctions" element={<AuctionListPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route path="filter-data" element={<FilterData />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="collection/:id" element={<AllCategoryProducts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default HomeRoutesWrapper;
