import React, { useState } from "react";
import "../style.css";
import { useFetchCategories } from "../../../hooks/Categories/useFetchCategories";
import { useCreateSubCategory } from "../../../hooks/Categories/useCreateSubCategory";

export const AddSubCategoriesForm = () => {
  const [CategoryId, setParentCategoryId] = useState("");
  const [name, setSubCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const token = sessionStorage.getItem("token");

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: categoriesError,
    error: fetchError,
  } = useFetchCategories(token);

  const {
    mutate: createSubCategory,
    isLoading: isCreating,
    isError: creationError,
    error: creationErrorMessage,
  } = useCreateSubCategory(token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!CategoryId) {
      setError("Parent category is required");
      return;
    }
    if (!name.trim()) {
      setError("Subcategory name is required");
      return;
    }

    try {
      createSubCategory({
        name,
        description,
        CategoryId,
      });
      setMessage("Subcategory added successfully!");
      setSubCategoryName("");
      setDescription("");
      setParentCategoryId("");
      setError("");
    } catch (error) {
      setError("Failed to add subcategory");
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
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        {creationError && (
          <p className="error">
            {creationErrorMessage?.message || "An error occurred"}
          </p>
        )}
        <button type="submit" disabled={isCreating}>
          {isCreating ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
