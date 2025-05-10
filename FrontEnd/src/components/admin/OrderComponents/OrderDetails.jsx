import React from "react";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 text-lg font-medium">No order details found!</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Order Details</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-600 font-medium">Payment Method:</span>
          <span className="text-gray-800 font-semibold">{order.paymentMethod}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-600 font-medium">Delivery Fees:</span>
          <span className="text-green-600 font-semibold">Free</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border border-gray-200">
          <span className="text-gray-800 font-bold">Total Amount:</span>
          <span className="text-gray-900 font-bold text-lg">{order.totalAmount}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <span className="text-gray-600 font-medium">Status:</span>
        <div className={`px-4 py-2 rounded-full text-white font-semibold ${getStatusColor(order.status)}`}>
          {order.status || "Pending"}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
