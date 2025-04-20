import React, { useState } from "react";
import { useFetchOrders } from "../../../hooks/admin/Orders/useFetchOrders";

import dollar from "./icons/dollor.png";
import reviews from "./icons/reviews.png";
import sales from "./icons/sales.png";

export const DashBoardView = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  const { data = [] } = useFetchOrders();

  // Calculate the range of rows to display based on the current page
  const startIndex = currentPage * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const handleNext = () => {
    if ((currentPage + 1) * rowsPerPage < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-orange-500 rounded-xl shadow-lg p-4 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <img src={reviews} alt="Reviews" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold">Reviews</h3>
                <p className="text-white/80 text-sm">Total Reviews</p>
              </div>
            </div>
            <div className="text-white text-2xl font-bold">0</div>
          </div>
        </div>

        <div className="bg-green-500 rounded-xl shadow-lg p-4 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <img src={dollar} alt="Revenue" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold">Revenue</h3>
                <p className="text-white/80 text-sm">Total Revenue</p>
              </div>
            </div>
            <div className="text-white text-2xl font-bold">$0</div>
          </div>
        </div>

        <div className="bg-rose-500 rounded-xl shadow-lg p-4 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <img src={sales} alt="Sales" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold">Sales</h3>
                <p className="text-white/80 text-sm">Total Sales</p>
              </div>
            </div>
            <div className="text-white text-2xl font-bold">0</div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-blue-950">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order)}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order._id.substring(order._id.length - 6)}
                  </td>
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
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
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
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                currentPage === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-950 text-white hover:bg-blue-900'
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage + 1} of {Math.ceil(data.length / rowsPerPage)}
            </span>
            <button
              onClick={handleNext}
              disabled={(currentPage + 1) * rowsPerPage >= data.length}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                (currentPage + 1) * rowsPerPage >= data.length
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-950 text-white hover:bg-blue-900'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  
};
