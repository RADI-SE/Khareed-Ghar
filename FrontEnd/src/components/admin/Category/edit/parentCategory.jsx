import React, { useState,useEffect } from "react";
import "../style.css";
import { useFetchCategories } from "../../../../hooks/Categories/useFetchCategories";
import { useEditCategory } from "../../../../hooks/Categories/useEditCategory";
import { useAdminService } from "../../../../services/adminServices";
export const EditCategoriesForm = () => {
  const [CategoryId, setCategoryId] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const { errorMessage, setError, clearError, isError } = useAdminService();
 
  const token = sessionStorage.getItem("token");

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: categoriesError,
    error: fetchError,
  } = useFetchCategories(token);

  const {
    mutate: editCategory,
    isLoading: isUpdating,
  } = useEditCategory(token);

  useEffect(() => {
    if (isError) {
      setError(errorMessage);
      const timer = setTimeout(() => clearError(), 1000);
      return () => clearTimeout(timer);  
    }
  }, [isError, errorMessage, setError, clearError]);
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    editCategory(
      { CategoryId, CategoryName, description },
    );
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setCategoryName("");
    setDescription("");
  };

  if (isLoadingCategories) {
    return <p>Loading categories...</p>;
  }

  if (categoriesError) {
    return <p>Error loading categories: {fetchError.message}</p>;
  }


  return (
    <div className="add-category-form">
      <div className="form-group">
        <label>Select Category</label>
        <select value={CategoryId} onChange={handleCategoryChange}
        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10C8B8] focus:border-transparent"
        >
          <option value="">Select parent category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {CategoryId && (
        <form onSubmit={handleSubmit}>
          <h5 className="p-2">Edit Category</h5>
          <div className="form-group pt-2">
            <label>Category Name</label>
            <input
              type="text"
              value={CategoryName}
              className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10C8B8] focus:border-transparent"
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10C8B8] focus:border-transparent"
              placeholder="Enter category description"
            />
          </div>
          {errorMessage && (
            <p className="alert alert-danger">{errorMessage}</p>
          )}
          <button type="submit" disabled={isUpdating} className="bg-[#10C8B8] hover:bg-[#0eb2a6] py-2 px-3 rounded text-white">
            {isUpdating ? "Updating..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};
