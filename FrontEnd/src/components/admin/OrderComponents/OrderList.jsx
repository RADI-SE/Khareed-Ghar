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
    <div className="">
      <div className="">
        <h4>Recent Orders</h4>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-blue-950">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Item</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Qty</th>
                <th className="px-6 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) =>
                address.Carts.map((cart, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(cart)}
                    style={{ cursor: "pointer" }}
                    className="bg-white-500 border-b hover:bg-gray-300"
                  >
                    <td className="px-6 py-2">{cart.id}</td>
                    <td className="px-6 py-2">
                      <img
                        src={cart.photo}
                        alt="cartimage"
                        style={{ height: "50px" }}
                        className="px-6 py-2"
                      />
                    </td>
                    <td className="px-6 py-2">{cart.name}</td>
                    <td className="px-6 py-2">{cart.price}</td>
                    <td className="px-6 py-2">{cart.qty}</td>
                    <td className="px-6 py-2">{cart.total}</td>
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
