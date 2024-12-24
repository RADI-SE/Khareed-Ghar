import React, { useState } from "react";
import "../style.css";
import { useCreateCategory } from "../../../../hooks/Categories/useCreateCategory";

export const AddCategoryForm = () => {
  const [name, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const token = sessionStorage.getItem("token");

  const {
    mutate: createCategory,
    isLoading: isCreating,
    isError: creationError,
    error: creationErrorMessage,
  } = useCreateCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !description) {
      alert("Name and description are required");
      return false;
    }
    
    if( name != null && description != null ){
      alert("New category created successfully");
    }
    createCategory({
      token,
      name,
      description,
    });
  };
  return (
    <div className="add-category-form">
      <form onSubmit={handleSubmit}>
        <h3>Add Category</h3>
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter category description"
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
