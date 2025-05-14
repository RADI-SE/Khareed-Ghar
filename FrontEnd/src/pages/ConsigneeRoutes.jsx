import { Outlet, Route, Routes } from "react-router-dom";
import DashBoardView from "../components/Consignee/DashboardComponents/DashboardView";
import GetProducts from "../components/Consignee/Products/GetProducts";
import OrderDetails from "../components/Consignee/OrderComponents/OrderDetails";
import OrderList from "../components/Consignee/OrderComponents/OrderList";
import NotFound from "../components/NotFound";
import Notifications from "../components/Consignee/Notifications/Notifications";
import ConsigneeLayout from "../components/layouts/ConsigneeLayout";
import ConsigneeProfile from "../components/Consignee/ConsigneeProfile";


const ConsigneeRoutes = () => {
  return (
    <ConsigneeLayout>
      <Outlet />
    </ConsigneeLayout>
  );
};

const ConsigneeRoutesWrapper = () => {
  return (
    <Routes>
     <Route path="/" element={<ConsigneeRoutes />}>
      <Route index element={<DashBoardView />} />
      <Route path="dashboard" element={<DashBoardView />} />
      <Route path="orders" element={<OrderList />} />
      <Route path="orders/order-details" element={<OrderDetails />} />
      <Route path="products" element={<GetProducts />} /> 
      <Route path="notifications" element={<Notifications />} />
      <Route path="profile" element={<ConsigneeProfile />} />
      <Route path="*" element={<NotFound />} />
     </Route>
    </Routes>
  );
};

export default ConsigneeRoutesWrapper;
