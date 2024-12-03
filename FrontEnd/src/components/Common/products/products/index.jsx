import React, { useState } from "react";
import Pagination from "../../pagination"; // Ensure this is the correct path for the Pagination component.
import { FaEdit, FaEye } from "react-icons/fa";
import EditProductModal from "../../../seller/Product/edit/editProductModel";
import "../../style.css";
const ProductTable = ({ products, onProductClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 4;
  const startIndex = currentPage * rowsPerPage;
  const [id, setSelectedId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const paginatedProducts = products.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const handleEditClick = (productId) => {
    setSelectedId(productId);
    setShowEditModal(true);
  };

  console.log("This is a im sending to the server", id) // working

  const handleDeleteClick = (productId) => {
    setSelectedId(productId);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setSelectedId(null);
  };

  const handleProductUpdated = () => {
    refetch();
    handleModalClose();
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
          {paginatedProducts?.map((product, index) => {
            const { _id, name, subcategory, image, createdAt } = product;
            return (
              <tr key={_id}>
                <td>{startIndex + index + 1}</td>
                <td>{_id}</td>
                <td>{name}</td>
                <td>{subcategory?.name || "N/A"}</td>
                <td>
                  <img
                    src={image}
                    alt={name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{new Date(createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => onProductClick(product)}
                  >
                    <FaEye />
                    View Details
                  </button>
                  <button
                    className="btn btn-warning "
                    onClick={() => handleEditClick(_id)}
                  >
                    <FaEdit className="me-2" /> Edit
                  </button>
                  <button
                    className="btn btn-danger "
                    onClick={() => handleDeleteClick(_id)}
                  >
                    <FaEdit className="me-2" /> remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        totalItems={products.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {id && (
        <EditProductModal
          id={id}
          show={showEditModal}
          handleClose={handleModalClose}
          onUserUpdated={handleProductUpdated}
        />
      )}
    </>
  );
};

export default ProductTable;
