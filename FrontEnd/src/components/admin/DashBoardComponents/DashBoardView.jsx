import React, { useState } from "react";
import { useFetchOrders } from "../../../hooks/admin/Orders/useFetchOrders";

import dollar from "./icons/dollor.png";
import reviews from "./icons/reviews.png";
import sales from "./icons/sales.png";

export const DashBoardView = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 3;

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
    <div className="p-4">
      {/* Dashboard Stats */}
      <div className="grid md:grid-cols-3 justify-stretch">
        
        <div className="col-span-1 bg-orange-500 rounded-lg shadow-2xl p-3 m-3">
            <div className="image-fluid">
              <img src={reviews} alt="Reviews" />
            </div>
            <div>
              <h3>Reviews</h3>
            </div>
        </div>


        <div className="col-span-1 bg-green-500 rounded-lg shadow-2xl p-3 m-3">
            <div className="image-fluid">
              <img src={dollar} alt="Reviews" />
            </div>
            <div>
              <h3>Revenue</h3>
            </div>
          </div>

          <div className="col-span-1 bg-rose-500 rounded-lg shadow-2xl p-3 m-3">
            <div className="image-fluid">
              <img src={sales} alt="Reviews" />
            </div>
            <div>
              <h3 className="">Sales</h3>
            </div>
          </div>
      </div>

      {/* Orders Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3 justify-stretch">
        <h3>Recent Orders</h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-white uppercase bg-blue-950">
          <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              </tr>
          </thead>
          <tbody>
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

        {/* Pagination Buttons */}
        <div className="justify-stretch h-10">
          <button onClick={handlePrevious} disabled={currentPage === 0} className="w-25 h-100 bg-blue-950 text-white rounded-lg my-4 mx-4">
            Previous
          </button>
          <span>
            Page {currentPage + 1}
          </span>
          <button
            onClick={handleNext}
            disabled={(currentPage + 1) * rowsPerPage >= data.length}  className="w-25 h-100 bg-blue-950 text-white rounded-lg my-4 mx-4"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
