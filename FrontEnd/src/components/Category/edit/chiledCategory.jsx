import React, { useState } from "react";
import "../style.css";
import { useFetchCategories } from "../../../hooks/Categories/useFetchCategories";
import { useEditSubCategory } from "../../../hooks/Categories/useEditSubCategory";

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
    if (!CategoryId || !SubCategoryId || !CategoryName.trim()) {
      setMessage("Please fill out all required fields.");
      return;
    }

    editCategory(
      { SubCategoryId, CategoryId, CategoryName, description },
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
    setSubCategoryId("");
    setCategoryName("");
    setDescription("");
  };

  const handleSubCategoryChange = (e) => {
    setSubCategoryId(e.target.value);
    const selectedCategory = categories.find(
      (category) => category._id === CategoryId
    );
    const subCategory = selectedCategory?.subcategories.find(
      (sub) => sub._id === e.target.value
    );

    if (subCategory) {
      setCategoryName(subCategory.name);
      setDescription(subCategory.description);
    }
  };

  if (isLoadingCategories) {
    return <p>Loading categories...</p>;
  }

  if (categoriesError) {
    return (
      <p>
        Error loading categories: {fetchError?.message || "An error occurred."}
      </p>
    );
  }

  return (
    <div className="edit-category-form">
      <h2>Edit SubCategory</h2>
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
        <div className="form-group">
          <label>Select Subcategory</label>
          <select value={SubCategoryId} onChange={handleSubCategoryChange}>
            <option value="">Select subcategory</option>
            {categories
              .find((category) => category._id === CategoryId)
              ?.subcategories.map((subCategory) => (
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
              required
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
        </form>
      )}

      {updateCategoryError && (
        <p className="error-message">
          {updateError?.response?.data?.message ||
            updateError?.message ||
            "Failed to update subcategory."}
        </p>
      )}
    </div>
  );
};
