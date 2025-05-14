import { useNavigate } from "react-router-dom";
import { useFetchUserOrders } from "../../../hooks/admin/Orders/useFetchUserOrders";


const DashBoardView = () => {
  const id = sessionStorage.getItem("id");
  console.log("User ID:", id);
  const navigate = useNavigate();
  const { data = [] } = useFetchUserOrders();

  // 67322fc629f3c194f356342a

  // Filter orders that belong to the specific user
  const userOrders = data.filter((order) => order.user === id);

  const handleRowClick = (order) => {
    navigate("order-details", { state: { order } });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="mb-6">
        <h4 className="text-2xl font-semibold text-gray-800">Delievered Orders</h4>
      </div>
      <div className="border-t border-gray-200">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#10C8B8]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userOrders.map((order) => (
                <tr
                  key={order._id}
                  className=""
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {userOrders.length === 0 && (
            <div className="p-4 text-gray-500 text-center">No orders found for this user.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoardView;
