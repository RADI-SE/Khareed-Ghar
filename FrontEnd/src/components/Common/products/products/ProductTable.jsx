import React, { useState } from "react";
import Pagination from "../../pagination";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import EditProductModal from "../../../seller/Product/edit/editProductModel";
import { ConfirmationModal } from "../../confirmationModal/ConfirmationModel";
import { useDeleteProduct } from "../../../../hooks/seller/useDeleteProduct";
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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-blue-950">
            <tr>
              <th className="px-6 py-3">S.N</th>
              <th className="px-6 py-3">Product ID</th>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Brand</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Created Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts?.map((product, index) => {
              const { _id, name, subcategory, images, createdAt } = product;
              return (
                <tr
                  key={_id}
                  className="bg-white-500 border-b hover:bg-gray-300"
                >
                  <td className="px-6 py-2">{startIndex + index + 1}</td>
                  <td className="px-6 py-2">{_id}</td>
                  <td className="px-6 py-2">{name}</td>
                  <td className="px-6 py-2">{subcategory?.name || "N/A"}</td>
                  <td className="px-6 py-2">
                    <img
                      src={
                        `../../../../../public/images${images}` || defaultImage
                      }
                      alt={name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  </td>

                  <td className="px-6 py-2">
                    {new Date(createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-2">
                    <button
                      className="w-4 h-5 mr-2 text-yellow-500"
                      onClick={() => onProductClick(product)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="w-4 h-5 mr-2 text-green-6"
                      onClick={() => handleEditClick(product)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="w-4 h-5 text-red-500"
                      onClick={() => handleDeleteClick(product)}
                    >
                      <FaTrashAlt />
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
      </div>
    </>
  );
};

export default ProductTable;
