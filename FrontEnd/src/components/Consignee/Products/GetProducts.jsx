import React, { useState } from "react";

import ProductTable from "../../Common/products/products/ProductTable";
import ProductDetail from "../../seller/Product/dashboard/ProductDetail";
import { useFetchConsigneeProducts } from "../../../hooks/useFetchConsigneeProducts";
const GetProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: products = [],
    isLoading: isLoadingProducts,
    isError: productsError,
  } = useFetchConsigneeProducts();

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
