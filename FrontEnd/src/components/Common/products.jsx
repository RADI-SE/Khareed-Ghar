import React, { useEffect, useState } from "react";
import { useGetAllCategoryProducts } from "../../hooks/Categories/useGetAllCategoryProducts";
import ProductCard from "./ProductCard";
import { useGetCategoryById } from "../../hooks/Categories/searchCategoryById";

const AllCategoryProducts = (id) => {
  const {
    data: getAllCategoryProducts,
    isLoading,
    error,
  } = useGetAllCategoryProducts(id);

  const { data: getCategoryById } = useGetCategoryById(id);

  const [count, setCount] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
   
    if (getCategoryById) {
      setCount(`Found ${getAllCategoryProducts?.length} products`);
      setCategoryName(getCategoryById.name);
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-start flex-1">{categoryName}</h2>
        {/* <h2 className="text-2xl font-bold text-center flex-1">{count}</h2> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {getAllCategoryProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllCategoryProducts;
