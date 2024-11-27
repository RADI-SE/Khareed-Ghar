import React, { useState } from "react";
import "../style.css";
import { useFetchCategories } from "../../../hooks/Categories/useFetchCategories";
import { useEditCategory } from "../../../hooks/Categories/useEditCategory";
export const EditCategoriesForm = () => {
  const [CategoryId, setCategoryId] = useState("");
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
  } = useEditCategory(token);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!CategoryId) {
      setMessage("Parent category is required");
      return;
    }
    if (!CategoryName.trim()) {
      setMessage("Subcategory name is required");
      return;
    }
    editCategory(
      { CategoryId, CategoryName, description },
      {
        onSuccess: () => {
          setMessage("Subcategory updated successfully.");
          setTimeout(() => setMessage(""), 3000);
        },
      }
    );
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setCategoryName("");
    setDescription("");
    setMessage("");
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
        <form onSubmit={handleSubmit}>
          <h3>Add SubCategory</h3>
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
          {message && <p className="message">{message}</p>}
          <button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Submit"}
          </button>
          {updateCategoryError && (
            <p className="error-message">
              {updateError?.response?.data?.message || "An error occurred."}
            </p>
          )}
        </form>
      )}
    </div>
  );
};
