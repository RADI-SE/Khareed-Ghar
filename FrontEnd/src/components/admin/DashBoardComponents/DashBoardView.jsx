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
    <div className="dashboard">
      {/* Dashboard Stats */}
      <div className="stats-container">
        <div className="stat-item">
          <img src={reviews} alt="Reviews" className="stat-icon" />
          <h3>Reviews</h3>
        </div>

        <div className="stat-item">
          <img src={dollar} alt="Revenue" className="stat-icon" />
          <h3>Revenue</h3>
        </div>

        <div className="stat-item">
          <img src={sales} alt="Sales" className="stat-icon" />
          <h3>Sales</h3>
        </div>
      </div>

      {/* Orders Table */}
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Customer</th>
              <th>Payment Method</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img
                    className="order-item-img"
                    src={item.item}
                    alt={`Product ${item.item}`}
                    width="50"
                    height="50"
                  />
                </td>
                <td>{item.first_name}</td>
                <td>{item.payment}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Buttons */}
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 0}>
            Previous
          </button>
          <span>
            Page {currentPage + 1}
          </span>
          <button
            onClick={handleNext}
            disabled={(currentPage + 1) * rowsPerPage >= data.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
