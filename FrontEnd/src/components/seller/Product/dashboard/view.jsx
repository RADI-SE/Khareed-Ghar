import React, { useState } from "react";
import { useFetchProducts } from "../../../../hooks/seller/useFetchProducts";
import CategoryTable from "../../../Common/category/parent-category"; 
import SubcategoryTable from "../../../Common/category/sub-category"; 
import ProductTable from "../../../Common/products/products";

const DetailedProductView = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const token = sessionStorage.getItem("token");

  const {
    data: products = [],  
    isLoading: isLoadingProducts,
    isError: productsError,
  } = useFetchProducts();

  const handleProductClick = (category) => {
    setSelectedProduct(category);   
  };

  const handleBackClick = () => {
    setSelectedProduct(null);  
  };

  if (isLoadingProducts) {
    return <div>Loading...</div>;
  } 
  
  if (productsError) {
    return <div>Error fetching products: {productsError.message}</div>;
  }

  return (
    <div className="table-responsive">
      {selectedProduct ? (
        <div>
          <h4>Details of  {selectedProduct.name}</h4>
          {selectedProduct.subcategories && selectedProduct.subcategories.length > 0 ? (
            <SubcategoryTable
              subcategories={selectedProduct.subcategories} 
              selectedCategory={selectedProduct}
              onBackClick={handleBackClick}
            />
          ) : (
            <div>No Details available for {selectedProduct.name}</div>  
          )}
        </div>
      ) : (
        <div>
          <h4>Products</h4>
          <ProductTable
            products={products}
            onCategoryClick={handleProductClick}
          />
        </div>
      )}
    </div>
  );
};

export default DetailedProductView;
