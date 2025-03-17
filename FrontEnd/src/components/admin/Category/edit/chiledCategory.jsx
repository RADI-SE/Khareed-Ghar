import React, { useState } from "react";
import "../style.css";
import { useFetchCategories } from "../../../../hooks/Categories/useFetchCategories";
import { useEditSubCategory } from "../../../../hooks/Categories/useEditSubCategory";
import toast from 'react-hot-toast';

export const EditSubCategoriesForm = () => {
  const [CategoryId, setCategoryId] = useState("");
  const [SubCategoryId, setSubCategoryId] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const token = sessionStorage.getItem("token");

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: categoriesError,
    error: fetchError,
  } = useFetchCategories(token);

  const {
    mutate: editCategory,
    isError: updateCategoryError,
    error: updateError,
    isLoading: isUpdating,
  } = useEditSubCategory(token);

  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (!SubCategoryId || !CategoryName) {
      toast.error("Name and description are required");
      return false;
    }

    if (!CategoryId) {
      toast.error("Parent category not found");
      return false;
    }

    if (!SubCategoryId) {
      toast.error("Subcategory not found");
      return false;
    }

    editCategory(
      { SubCategoryId, CategoryId, CategoryName, description },
    );
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setSubCategoryId("");
    setCategoryName("");
    setDescription("");
  };

  const handleSubCategoryChange = (e) => {
    setSubCategoryId(e.target.value);
    const selectedSubCategory = categories
      .find(cat => cat._id === CategoryId)
      ?.subcategories
      .find(sub => sub._id === e.target.value);
    if (selectedSubCategory) {
      setCategoryName(selectedSubCategory.name);
      setDescription(selectedSubCategory.description || "");
    }
  };

  if (isLoadingCategories) return <p>Loading categories...</p>;
  if (categoriesError) return <p>Error loading categories</p>;

  const selectedCategory = categories.find(cat => cat._id === CategoryId);
  const subcategories = selectedCategory?.subcategories || [];

  return (
    <div className="edit-category-form">
      <h2>Edit Subcategory</h2>
      <div className="form-group">
        <label>Select Parent Category</label>
        <select value={CategoryId} onChange={handleCategoryChange}>
          <option value="">Select parent category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {CategoryId && (
        <div className="form-group">
          <label>Select Subcategory</label>
          <select value={SubCategoryId} onChange={handleSubCategoryChange}>
            <option value="">Select subcategory</option>
            {subcategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {SubCategoryId && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subcategory Name</label>
            <input
              type="text"
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter subcategory name"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter subcategory description"
            />
          </div>
          <button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Subcategory"}
          </button>
        </form>
      )}
    </div>
  );
};
