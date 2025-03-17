import React from "react";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const navigate = useNavigate();

  // Fake data
  const addresses = [
    {
      Carts: [
        {
          id: 1,
          photo: "https://via.placeholder.com/50",
          name: "Item 1",
          price: 500,
          qty: 2,
          total: 1000,
          status: "Delivered",
        },
        {
          id: 2,
          photo: "https://via.placeholder.com/50",
          name: "Item 2",
          price: 300,
          qty: 1,
          total: 300,
          status: "Processing",
        },
      ],
    },
  ];

  const handleRowClick = (order) => {
    navigate("order-details", { state: { order } });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h4 className="text-2xl font-semibold text-gray-800">Recent Orders</h4>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-950">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Item</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Qty</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {addresses.map((address) =>
                address.Carts.map((cart, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(cart)}
                    className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cart.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={cart.photo}
                        alt="cartimage"
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cart.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cart.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cart.qty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cart.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
