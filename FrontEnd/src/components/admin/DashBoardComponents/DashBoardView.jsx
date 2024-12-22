import React, { useState } from "react";

import dollar from "./icons/dollor.png";
import reviews from "./icons/reviews.png";
import sales from "./icons/sales.png";
import data from "../../../mockJsons/orderData.json";

export const DashBoardView = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-blue-950 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Payment Method</th>
              <th className="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className="bg-white-500 border-b hover:bg-gray-300">
                <td className="px-6 py-3">{item.id}</td>
                <td className="px-6 py-3">
                  <img
                    className="order-item-img"
                    src={item.item}
                    alt={`Product ${item.item}`}
                    width="50"
                    height="50"
                  />
                </td>
                <td className="px-6 py-3">{item.first_name}</td>
                <td className="px-6 py-3">{item.payment}</td>
                <td className="px-6 py-3">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Buttons */}
        <div className="justify-stretch h-10">
          <button onClick={handlePrevious} disabled={currentPage === 0} className="w-25 h-100 bg-blue-950 text-white rounded-lg">
            Previous
          </button>
          <span>
            Page {currentPage + 1}
          </span>
          <button
            onClick={handleNext}
            disabled={(currentPage + 1) * rowsPerPage >= data.length}  className="w-25 h-100 bg-blue-950 text-white rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
