import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";


const FilterData = () => {
  const filterProducts = useSelector((state) => state.product.filteredData);
  return (
    <div className="container mx-auto py-12">
      <h2 className="mx-2xl font-bold mb-6 text-center ">
        Best Tablets Deals!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filterProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default FilterData;
