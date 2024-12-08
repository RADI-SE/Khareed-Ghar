import React, { useState } from "react";
import Pagination from "../../pagination";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import EditProductModal from "../../../seller/Product/edit/editProductModel";
import { ConfirmationModal } from "../../category/confirmationModal/ConfirmationModel";
import { useDeleteProduct } from "../../../../hooks/seller/useDeleteProduct";
import "../../style.css";
import defaultImage from "../../../../assets/images/default.jpeg";
const ProductTable = ({ products, onProductClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 4;
  const startIndex = currentPage * rowsPerPage;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmationName, setConfirmationName] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const token = sessionStorage.getItem("token");

  const paginatedProducts = products.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const { mutate: deleteProduct } = useDeleteProduct(token);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
    setConfirmationName("");
    setModalMessage("");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const handleDelete = () => {
    deleteProduct(
      { id: selectedProduct._id, name: selectedProduct.name },
      {
        onSuccess: () => {
          setModalMessage("Category deleted successfully!");
          setShowDeleteModal(false);
          refetch();
        },
        onError: () => {
          setModalMessage("Failed to delete category. Please try again.");
        },
      }
    );
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
            const { _id, name, subcategory, images, createdAt } = product;
            return (
              <tr key={_id}>
                <td>{startIndex + index + 1}</td>
                <td>{_id}</td>
                <td>{name}</td>
                <td>{subcategory?.name || "N/A"}</td>
                <td>
                  <img
                  src={`../../../../../public/images${images}` || defaultImage}
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
                    className="btn btn-warning"
                    onClick={() => handleEditClick(product)}
                  >
                    <FaEdit className="me-2" /> Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(product)}
                  >
                    <FaTrashAlt className="me-2" /> Remove
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
      {selectedProduct && (
        <>
          <EditProductModal
            id={selectedProduct._id}
            show={showEditModal}
            handleClose={handleModalClose}
            onUserUpdated={() => {
              refetch();
              handleModalClose();
            }}
          />
          <ConfirmationModal
            show={showDeleteModal}
            onClose={handleDeleteModalClose}
            onConfirm={handleDelete}
            isLoading={false}
            modalMessage={modalMessage}
            confirmationName={confirmationName}
            setConfirmationName={setConfirmationName}
            selectedCategoryName={selectedProduct.name}
          />
        </>
      )}
    </>
  );
};

export default ProductTable;
