// import { useState } from "react";
// import Pagination from "../../Common/pagination";
// import {FaEye, FaTrashAlt } from "react-icons/fa";
// import { ConfirmationModal } from "../../Common/confirmationModal/ConfirmationModel";
// import { useDeleteProduct } from "../../../hooks/seller/useDeleteProduct";
// import defaultImage from "../../../assets/images/default.jpeg";


// const GetProducts = ({ products, onProductClick }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const rowsPerPage = 4;
//   const startIndex = currentPage * rowsPerPage;
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [confirmationName, setConfirmationName] = useState("");
//   const [modalMessage, setModalMessage] = useState("");
//   const token = sessionStorage.getItem("token");

//   const paginatedProducts = Array.isArray(products) ? products.slice(start, end) : [];
//   const { mutate: deleteProduct } = useDeleteProduct(token);

//   const handleDeleteClick = (product) => {
//     setSelectedProduct(product);
//     setShowDeleteModal(true);
//     setConfirmationName("");
//     setModalMessage("");
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleDeleteModalClose = () => {
//     setShowDeleteModal(false);
//     setSelectedProduct(null);
//   };

//   const handleDelete = () => {
//     if (!confirmationName || confirmationName.trim() !== selectedProduct.name.trim()) {
//       setModalMessage("The product name does not match. Please try again.");
//       return;
//     }

//     deleteProduct(
//       { id: selectedProduct._id, name: selectedProduct.name },
//       {
//         onSuccess: () => {
//           setShowDeleteModal(false);
//           setModalMessage("Product deleted successfully!");
//           refetch();
//         },
//         onError: (error) => {
//           setModalMessage(error.response?.data?.message || "Failed to delete product");
//         },
//       }
//     );
//   };

//   return (
//     <>

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
//         <table className="w-full text-sm text-left text-gray-500">
//           <thead className="text-xs text-white uppercase bg-[#10C8B8]">
//             <tr>
//               <th className="px-6 py-3">S.N</th>
//               <th className="px-6 py-3">Product ID</th>
//               <th className="px-6 py-3">Product Name</th>
//               <th className="px-6 py-3">Brand</th>
//               <th className="px-6 py-3">Image</th>
//               <th className="px-6 py-3">Created Date</th>
//               <th className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedProducts?.map((product, index) => {
//                return (
//                 <tr
//                   key={product._id}
//                   className="bg-white-500 border-b hover:bg-gray-300"
//                 >
//                   <td className="px-6 py-2">{startIndex + index + 1}</td>
//                   <td className="px-6 py-2">{product._id}</td>
//                   <td className="px-6 py-2">{product.name}</td>
//                   <td className="px-6 py-2">{product.subcategory?.name || "N/A"}</td>
//                   <td className="px-6 py-2">
//                     <img
//                       src={
//                         `../../../../../public/images${product.images}` || defaultImage
//                       }
//                       alt={product.name}
//                       style={{
//                         width: "60px",
//                         height: "60px",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </td>

//                   <td className="px-6 py-2">
//                     {new Date(product.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-2 py-2">
//                     <button
//                       className="w-4 h-5 mr-2 text-yellow-500"
//                       onClick={() => onProductClick(product)}
//                     >
//                       <FaEye />
//                     </button>
//                     <button
//                       className="w-4 h-5 text-red-500"
//                       onClick={() => handleDeleteClick(product)}
//                     >
//                       <FaTrashAlt />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         <Pagination
//           totalItems={Array.isArray(products) ? products.length : 0}
//           rowsPerPage={rowsPerPage}
//           currentPage={currentPage}
//           onPageChange={handlePageChange}
//         />
//         {selectedProduct && (
//           <>
//             <EditProductModal
//               id={selectedProduct._id}
//               show={showEditModal}
//               handleClose={handleModalClose}
//               onUserUpdated={() => {
//                 refetch();
//                 handleModalClose();
//               }}
//             />
//             <ConfirmationModal
//               show={showDeleteModal}
//               onClose={handleDeleteModalClose}
//               onConfirm={handleDelete}
//               isLoading={false}
//               modalMessage={modalMessage}
//               confirmationName={confirmationName}
//               setConfirmationName={setConfirmationName}
//               selectedName={selectedProduct.name}
//             />
//           </>
//         )}
//       </div>
//     </>
//   )
// }

// export default GetProducts

import React, { useEffect, useState } from "react";
import { useFetchProducts } from "../../../hooks/seller/useFetchProducts";
import ProductTable from "../../Common/products/products/ProductTable";
import ProductDetail from "../../seller/Product/dashboard/ProductDetail";

const GetProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: products = [],
    isLoading: isLoadingProducts,
    isError: productsError,
  } = useFetchProducts();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };


  if (isLoadingProducts) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {productsError.message}</span>
        </div>
      </div>
    );
  }

  console.log("Products From Consignee", products);

  return (  
    <>

    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {selectedProduct ? (
        <div className="max-w-7xl mx-auto">
          <button
            className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            onClick={handleBackClick}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </button>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Details of {selectedProduct.name}</h4>
            {selectedProduct._id ? (
              <ProductDetail selectedProduct={selectedProduct} />
            ) : (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Warning!</strong>
                <span className="block sm:inline"> No details available for {selectedProduct.name}.</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h4 className="text-2xl font-bold text-gray-900">Products</h4>
            </div>
            <div className="p-6">
              <ProductTable products={products} onProductClick={handleProductClick} />
            </div>
          </div>
        </div>
      )}
    </div>

  </>
  );
};
export default GetProducts;
