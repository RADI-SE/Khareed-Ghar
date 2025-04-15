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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h4 className="text-2xl font-semibold text-gray-800">Recent Orders</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-blue-950 rounded-t-lg">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Image</th>
              <th className="px-6 py-4 font-medium">Item</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Quantity</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {addresses.map((address) =>
              address.Carts.map((cart, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(cart)}
                  className="bg-white cursor-pointer"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">#{cart.id}</td>
                  <td className="px-6 py-4">
                    <img
                      src={cart.photo}
                      alt={cart.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-700">{cart.name}</td>
                  <td className="px-6 py-4 text-gray-700">Rs. {cart.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-700">{cart.qty}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">Rs. {cart.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cart.status)}`}>
                      {cart.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
