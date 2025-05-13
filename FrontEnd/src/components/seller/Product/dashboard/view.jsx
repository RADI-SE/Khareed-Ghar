import React, { useState } from "react";
import { useFetchProductsByUserId } from "../../../../hooks/seller/useFetchProductsByUserId";
import ProductTable from "../../../Common/products/products/ProductTable";
import ProductDetail from "./ProductDetail";

const DetailedProductView = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const id = sessionStorage.getItem("id");

  const {
    data: products = [],
    isLoading: isLoadingProducts,
    isError: productsError,
  } = useFetchProductsByUserId(id);


  console.log("Productsss View", products)
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  if (isLoadingProducts) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <div className="text-center text-red-600 bg-red-50 p-6 rounded-lg border border-red-200 shadow-sm">
          <p className="text-lg font-semibold">Error fetching products</p>
          <p className="mt-2">{productsError.message}</p>
        </div>
      </div>
    );
  }

  return (  
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {selectedProduct ? (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300">
          <div className="p-6">
          <button
            className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-700 bg-white hover:text-[#FFD700] border border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700] transition-colors duration-200"
            onClick={handleBackClick}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </button>
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
              Details of {selectedProduct.name}
            </h4>
            {selectedProduct._id ? (
              <div className="bg-white rounded-lg">
                <ProductDetail selectedProduct={selectedProduct} />
              </div>
            ) : (
              <div className="bg-amber-50 text-amber-800 p-4 rounded-lg border border-amber-200">
                <p className="text-center">No details available for {selectedProduct.name}.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-6">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">Products</span>
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {products.length} items
              </span>
            </h4>
            <div className="overflow-hidden rounded-lg">
              <ProductTable products={products} onProductClick={handleProductClick} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedProductView;
