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
    <div className="">

      <div className="relative overflow-x-auto shadow-lg">
        <h3>Recent Sales</h3>
        <table className="w-full mt-2 text-sm text-left rtl:text-right text-black rounded-lg">
          <thead className="text-xs text-white uppercase bg-blue-950">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Payment Method</th>
              <th className="px-6 py-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className="bg-white-500 border-b hover:bg-gray-300">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">
                  <img
                    className="order-item-img"
                    src={item.item}
                    alt={`Product ${item.item}`}
                    width="50"
                    height="50"
                  />
                </td>
                <td className="px-6 py-4">{item.first_name}</td>
                <td className="px-6 py-4">{item.payment}</td>
                <td className="px-6 py-4">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Buttons */}
        <div className="h-20 p-3 flex flex-wrap items-center justify-between">
          <button onClick={handlePrevious} disabled={currentPage === 0} className="text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Previous
          </button>
          <span>
            Page {currentPage + 1}
          </span>
          <button
            onClick={handleNext}
            disabled={(currentPage + 1) * rowsPerPage >= data.length}  className="text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
