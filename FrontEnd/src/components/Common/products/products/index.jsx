import React, { useState } from "react";
import Pagination from "../../pagination"; // Ensure this is the correct path for the Pagination component.

const ProductTable = ({ products, onProductClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 4;
  const startIndex = currentPage * rowsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <table className="table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>S.N</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Image</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product, index) => (
            <tr key={product._id}>
              <td>{startIndex + index + 1}</td> {/* Adjusted to show the correct serial number across pages */}
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.subcategory?.name || "N/A"}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              </td>
              <td>{new Date(product.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => onProductClick(product)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={products.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ProductTable;
