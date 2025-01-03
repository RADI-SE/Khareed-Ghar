import React, { useState } from "react";
import { useFetchProducts } from "../../../../hooks/seller/useFetchProducts";
import ProductTable from "../../../Common/products/products/ProductTable";
import ProductDetail from "./ProductDetail";

const DetailedProductView = () => {
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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Error fetching products: {productsError.message}
      </div>
    );
  }

  return (  
    <div>
      {selectedProduct ? (
        <div className="">
          <button
            className=""
            onClick={handleBackClick}
          >
            &larr; Back to Products
          </button>
          <h4 className="mb-4">Details of {selectedProduct.name}</h4>
          {selectedProduct._id ? (
            <ProductDetail selectedProduct={selectedProduct} />
          ) : (
            <div className="alert alert-warning">
              No details available for {selectedProduct.name}.
            </div>
          )}
        </div>
      ) : (
        <div className="shadow-lg p-4">
          <h4 className="mb-4">Products</h4>
          <ProductTable products={products} onProductClick={handleProductClick} />
        </div>
      )}
    </div>
  );
};

export default DetailedProductView;
