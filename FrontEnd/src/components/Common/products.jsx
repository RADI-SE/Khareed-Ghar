import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useAdminService } from "../../services/adminServices";

const AllCategoryProducts = () => {
  const { id } = useParams();
  const { getAllCategoryProducts } = useAdminService();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllCategoryProducts(id);
        setProducts(Array.isArray(response) ? response : []); // Ensure products is always an array
        setCategoryName(response?.categoryName || ""); // Set category name if available
      } catch (error) {
        setProducts([]); // Fallback to an empty array on error
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-start flex-1">{categoryName}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllCategoryProducts;