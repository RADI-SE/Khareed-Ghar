import React from "react";
import ProductCard from "../../components/Common/ProductCard";
import { useFetchProducts } from "../../hooks/seller/useFetchProducts";

const ProductsOnHomePage = () => {
  const {
    data: products = [],
    isLoading: isLoadingProducts,
    isError: productsError,
  } = useFetchProducts();

  if (isLoadingProducts){
    return <p>Loading...</p>;
  }
  if (productsError) {
    return <p>Error fetching products. Please try again later.</p>;
  }
  return (
    <>
      <div className="container mx-auto py-12">
        <h2 className="mx-2xl font-bold mb-6 text-center ">
          Best Mobile Deals!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
      <div className="container mx-auto py-12">
      </div>
      <div className="container mx-auto py-12">
      </div>
    </>
  );
};

export default ProductsOnHomePage;
