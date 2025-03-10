// import React, { useState } from "react";
// import { useFetchProductsByUserId } from "../../../../hooks/seller/useFetchProductsByUserId";
// import ProductTable from "../../../Common/products/products/ProductTable";
// import ProductDetail from "./ProductDetail";

// const DetailedProductView = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const id = sessionStorage.getItem("id");

//   const {
//     data: products = [],
//     isLoading: isLoadingProducts,
//     isError: productsError,
//   } = useFetchProductsByUserId(id);

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleBackClick = () => {
//     setSelectedProduct(null);
//   };

//   if (isLoadingProducts) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (productsError) {
//     return (
//       <div className="alert alert-danger text-center" role="alert">
//         Error fetching products: {productsError.message}
//       </div>
//     );
//   }

//   return (  
//     <div>
//       {selectedProduct ? (
//         <div className="">
//           <button
//             className=""
//             onClick={handleBackClick}
//           >
//             &larr; Back to Products
//           </button>
//           <h4 className="mb-4">Details of {selectedProduct.name}</h4>
//           {selectedProduct._id ? (
//             <ProductDetail selectedProduct={selectedProduct} />
//           ) : (
//             <div className="alert alert-warning">
//               No details available for {selectedProduct.name}.
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="shadow-lg p-4">
//           <h4 className="mb-4">Products</h4>
//           <ProductTable products={products} onProductClick={handleProductClick} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default DetailedProductView;


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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  if (isLoadingProducts) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
        Error fetching products: {productsError.message}
      </div>
    );
  }

  return (  
    <div className="p-6">
      {selectedProduct ? (
        <div className="bg-white shadow-md p-6 rounded-lg">
          <button
            className="mb-4 text-blue-500 hover:underline"
            onClick={handleBackClick}
          >
            &larr; Back to Products
          </button>
          <h4 className="text-xl font-bold mb-4">Details of {selectedProduct.name}</h4>
          {selectedProduct._id ? (
            <ProductDetail selectedProduct={selectedProduct} />
          ) : (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg">
              No details available for {selectedProduct.name}.
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h4 className="text-xl font-bold mb-4">Products</h4>
          <ProductTable products={products} onProductClick={handleProductClick} />
        </div>
      )}
    </div>
  );
};

export default DetailedProductView;
