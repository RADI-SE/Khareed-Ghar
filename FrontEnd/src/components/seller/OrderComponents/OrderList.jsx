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
    <div className="container">
      <div className="row w-100">
        <h4>Recent Orders</h4>
      </div>
      <div className="row w-100">
        <div className="table-responsive w-100">
          <table className="table table-hover">
            <thead>
              <tr>
                <th style={{ width: 130 }}>#</th>
                <th>Image</th>
                <th>Item</th>
                <th style={{ width: 150 }} className="text-center">Price</th>
                <th style={{ width: 150 }} className="text-center">Qty</th>
                <th style={{ width: 100 }} className="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) =>
                address.Carts.map((cart, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(cart)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{cart.id}</td>
                    <td>
                      <img
                        src={cart.photo}
                        alt="cartimage"
                        style={{ height: "50px" }}
                      />
                    </td>
                    <td>{cart.name}</td>
                    <td className="text-center">{cart.price}</td>
                    <td className="text-center">{cart.qty}</td>
                    <td className="text-center">{cart.total}</td>
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
