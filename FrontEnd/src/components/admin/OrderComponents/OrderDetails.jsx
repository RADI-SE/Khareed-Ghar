import React from "react";
import { useLocation } from "react-router-dom";
import "./order.css"; // Import a custom CSS file for styling

const OrderDetails = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <p className="error-message">No order details found!</p>;
  }

  return (
    <div className="order-details-container">
      <h2 className="order-details-title">Order Details</h2>
      <div className="order-summary">
        <div className="order-item">
          <span className="item-label">Sub Total:</span>
          <span className="item-value">{order.total}</span>
        </div>
        <div className="order-item">
          <span className="item-label">Delivery Fees:</span>
          <span className="item-value">Free</span>
        </div>
        <div className="order-item total-amount">
          <span className="item-label">Total Amount:</span>
          <span className="item-value">{order.total}</span>
        </div>
      </div>
      <div className="order-status">
        <label htmlFor="status" className="status-label">
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
