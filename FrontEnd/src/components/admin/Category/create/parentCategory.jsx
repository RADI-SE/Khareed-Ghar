import React, { useState,useEffect } from "react";
import "../style.css";
import { useCreateCategory } from "../../../../hooks/Categories/useCreateCategory";
import { useAdminService } from "../../../../services/adminServices";

export const AddCategoryForm = () => {
  const [name, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const token = sessionStorage.getItem("token");
  const { errorMessage, setError, clearError, isError } = useAdminService();
  const { successMessage, setSuccess, clearSuccess, isSuccess } = useAdminService();

  useEffect(() => {
    if (isSuccess) {
      setSuccess(successMessage);
      const timer = setTimeout(() => clearSuccess(), 2000);
      return () => clearTimeout(timer);  
    }
  }, [isSuccess, successMessage, setSuccess, clearSuccess]);

  
  useEffect(() => {
    if (isError) {
      setError(errorMessage);
      const timer = setTimeout(() => clearError(), 2000);
      return () => clearTimeout(timer);  
    }
  }, [isError, errorMessage, setError, clearError]);
  
  
  
  const {
    mutate: createCategory,
    isLoading: isCreating,
 
  } = useCreateCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();
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


        {errorMessage && (
            <p className="alert alert-danger">{errorMessage}</p>
          )}

          
        {successMessage && (
            <p className="alert alert-success">{successMessage  }</p>
          )}
        <button type="submit" disabled={isCreating}>
          {isCreating ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
