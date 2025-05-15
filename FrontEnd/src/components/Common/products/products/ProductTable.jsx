import { useState } from "react";
import Pagination from "../../pagination";
import { FaEdit, FaEye, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";
import EditProductModal from "../../../seller/Product/edit/editProductModel";
import { ConfirmationModal } from "../../confirmationModal/ConfirmationModel";
import { useDeleteProduct } from "../../../../hooks/seller/useDeleteProduct";
import defaultImage from "../../../../assets/images/default.jpeg";
import PropTypes from 'prop-types';
import { useConsigneeService } from "../../../../services/consignee/consigneeServices";
import { useDeleteConsignee } from "../../../../hooks/useDeleteConsignee";
const ProductTable = ({ products, onProductClick, onProductUpdate, isConsignment = false, hideDelete = false }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 4;
  const startIndex = currentPage * rowsPerPage;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [confirmationName, setConfirmationName] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const token = sessionStorage.getItem("token");
  const { acceptConsignment, updateProductForConsignment } = useConsigneeService();
  const [loading, setLoading] = useState(false);
  const { mutate: deleteConsignee } = useDeleteConsignee();
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

  const handleAccept = async (consignedProducts) => {
    try {
      setLoading(true);
      const response = await acceptConsignment(consignedProducts);
      console.log("response",response);
      
      await updateProductForConsignment({
        id: consignedProducts._id,
        consigneeId: response.consignee.consigneeId,
        consignmentStatus: "accepted"
      });

      setModalMessage("Consignment accepted successfully!");
      setShowMessageModal(true);
      if (onProductUpdate) {
        onProductUpdate();
      }
    } catch (error) {
      setModalMessage(error.message || "Failed to accept consignment!");
      setShowMessageModal(true);
    } finally {
      setLoading(false);
    }
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

  const handleMessageModalClose = () => {
    setShowMessageModal(false);
    setModalMessage("");
  };

  const handleDelete = () => {
    if (!confirmationName || confirmationName.trim() !== selectedProduct.name.trim()) {
      setModalMessage("The product name does not match. Please try again.");
      return;
    }

    deleteProduct(
      { id: selectedProduct._id, name: selectedProduct.name },
      {
        onSuccess: () => {
          setShowDeleteModal(false);
          setModalMessage("Product deleted successfully!");
          setShowMessageModal(true);
          if (onProductUpdate) {
            onProductUpdate();
          }
        },
        onError: (error) => {
          setModalMessage(error.response?.data?.message || "Failed to delete product");
          setShowMessageModal(true);
        },
      }
    );
  };

  const handleDeleteConsignee = (product) => { 
  
    deleteConsignee({id:product._id},
      {
        onSuccess: () => {
          setShowDeleteModal(false);
          setModalMessage("Product deleted successfully!");
          setShowMessageModal(true);
          if (onProductUpdate) {
            onProductUpdate();
          }
        },
      }
    );
  };

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-2xl font-bold text-gray-900">No products found</div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-white uppercase bg-[#10C8B8]">
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
          {paginatedProducts?.map((product, index) => (
            <tr
              key={product._id}
              className="bg-white-500 border-b hover:bg-gray-300"
            >
              <td className="px-6 py-2">{startIndex + index + 1}</td>
              <td className="px-6 py-2">{product._id}</td>
              <td className="px-6 py-2">{product.name}</td>
              <td className="px-6 py-2">{product.subcategory?.name || "N/A"}</td>
              <td className="px-6 py-2">
                <img
                  src={product.images ? `../../../../../public/images${product.images}` : defaultImage}
                  alt={product.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                  }}
                />
              </td>
              <td className="px-6 py-2">
                {new Date(product.createdAt).toLocaleDateString()}
              </td>
              <td className="px-2 py-2">
                <button
                  className="w-4 h-5 mr-2 text-yellow-500"
                  onClick={() => onProductClick(product)}
                >
                  <FaEye />
                </button>
              
                {isConsignment && !hideDelete && (
                  <>
                    <button
                      className="w-4 h-5 mr-2 text-green-600"
                      onClick={() => handleAccept(product)}
                      title="Accept"
                      disabled={loading}
                    >
                      <FaCheck />
                    </button>
                  </>
                )}
                {isConsignment && hideDelete && (
                  <>
                    <button
                      className="w-4 h-5 mr-2 text-red-500"
                      onClick={() => handleDeleteConsignee(product)}
                    >
                      <FaTrashAlt />
                    </button>
                  </>
                )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!isConsignment && (
        <Pagination
          totalItems={products.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      {selectedProduct && (
        <>
          <EditProductModal
            id={selectedProduct._id}
            show={showEditModal}
            handleClose={handleModalClose}
            onUserUpdated={() => {
              if (onProductUpdate) {
                onProductUpdate();
              }
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
            selectedName={selectedProduct.name}
          />
        </>
      )}
      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                {modalMessage.includes("successfully") ? (
                  <FaCheck className="h-6 w-6 text-green-600" />
                ) : (
                  <FaTimes className="h-6 w-6 text-red-600" />
                )}
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">
                {modalMessage.includes("successfully") ? "Success" : "Error"}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  {modalMessage}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleMessageModalClose}
                  className="px-4 py-2 bg-[#10C8B8] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#0EAE9F] focus:outline-none focus:ring-2 focus:ring-[#10C8B8]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  onProductClick: PropTypes.func.isRequired,
  onProductUpdate: PropTypes.func,
  isConsignment: PropTypes.bool
};

export default ProductTable;
