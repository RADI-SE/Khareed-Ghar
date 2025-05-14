import React from "react";
import { useLocation } from "react-router-dom";


const OrderDetails = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <p className="">No order details found!</p>;
  }

  return (
    <div className="">
      <h2 className="">Order Details</h2>
      <div className="">
        <div className="">
          <span className="">Sub Total:</span>
          <span className="">{order.total}</span>
        </div>
        <div className="">
          <span className="">Delivery Fees:</span>
          <span className="">Free</span>
        </div>
        <div className="">
          <span className="">Total Amount:</span>
          <span className="">{order.total}</span>
        </div>
      </div>
      <div className="">
        <label htmlFor="status" className="">
          Status:
        </label>
        <div
          className={`status-badge ${order.status?.toLowerCase() || "pending"}`}
          style={{
            backgroundColor:
              order.status?.toLowerCase() === "delivered" ? "green" : "red",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {order.status || "Pending"}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
