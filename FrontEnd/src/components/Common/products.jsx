import React, { useEffect, useState } from "react";
import { useGetAllCategoryProducts } from "../../hooks/Categories/useGetAllCategoryProducts";
import ProductCard from "./ProductCard";

const AllCategoryProducts = (id) => {
  const {
    data: getAllCategoryProducts,
    isLoading,
    error,
  } = useGetAllCategoryProducts(id);

  const [count, setCount] = useState("");

  useEffect(() => {
    if (getAllCategoryProducts?.length) {
        setCount(`Found ${getAllCategoryProducts.length} products`);

    }
  }, [getAllCategoryProducts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data...</div>;
  }

  return (
    <div>
      <div className="container mx-auto py-12">
        <h2 className="mx-2xl font-bold mb-6 text-center">{count}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {getAllCategoryProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategoryProducts;
