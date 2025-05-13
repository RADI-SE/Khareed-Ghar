import React, { useState, useEffect } from "react";
import "../style.css";
import { useFetchCategories } from "../../../../hooks/Categories/useFetchCategories";
import { useCreateSubCategory } from "../../../../hooks/Categories/useCreateSubCategory";
import { useAdminService } from "../../../../services/adminServices";

export const AddSubCategoriesForm = () => {
  const [CategoryId, setParentCategoryId] = useState("");
  const [name, setSubCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const token = sessionStorage.getItem("token");
 
    //  useEffect(() => {
    //     if (isSuccess) {
    //       setSuccess(successMessage);
    //       const timer = setTimeout(() => clearSuccess(), 2000);
    //       return () => clearTimeout(timer);  
    //     }
      // }, [isSuccess, setSuccess, clearSuccess]);
    
      
 

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: categoriesError,
    error: fetchError,
  } = useFetchCategories(token);

  const {
    mutate: createSubCategory,
    isLoading: isCreating,
  } = useCreateSubCategory(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createSubCategory({
        name,
        description,
        CategoryId,
      });
      setSubCategoryName("");
      setDescription("");
      setParentCategoryId("");
    } catch (error) {
  
      console.error("Error adding subcategory:", error);
    }
  };

  return (
    <div className="add-category-form">
      <form onSubmit={handleSubmit}>
        <h3>Add Subcategory</h3>
        <div className="form-group">
          <label>Parent Category</label>
          {isLoadingCategories ? (
            <p>Loading categories...</p>
          ) : categoriesError ? (
            <p className="error">
              {fetchError.message || "Failed to load categories"}
            </p>
          ) : (
            <select
              value={CategoryId}
              onChange={(e) => setParentCategoryId(e.target.value)}
              className="w-full border p-2 mt-2 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
            >
              <option value="">Select parent category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="form-group">
          <label>Subcategory Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setSubCategoryName(e.target.value)}
            placeholder="Enter subcategory name"
            className="w-full border p-2 mt-2 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter subcategory description"
            className="w-full border p-2 mt-2 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
          />
        </div>

        
        <button
        type="submit"
        disabled={isCreating}
        className={`w-full p-2 rounded bg-[#10C8B8] hover:bg-[#0eb2a6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
        
          {isCreating ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
