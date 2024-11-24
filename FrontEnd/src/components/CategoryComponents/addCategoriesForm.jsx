import React, { useState, useEffect } from "react";
import { useAdminService } from "../../services/adminServices";
import "./productstyle.css";
import { useMutation, useQuery } from "@tanstack/react-query";

export const AddCategoriesForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { AddCategoriesForm } = useAdminService();
  const token = sessionStorage.getItem("token");

  const mutation = useMutation({
    mutationFn: async () => {
      await AddCategoriesForm(token, categoryName, description);
    },
    onSuccess: () => {
      setCategoryName("");
      setDescription("");
      setError("");
      setMessage("Category added successfully!");
    },
    onError: (error) => {
      setError("Failed to add category");
      console.error("Error adding category:", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      setError("Category name is required");
      return;
    }
 
    mutation.mutate();
  };

  return (
    <div className="add-category-form">
      <form onSubmit={handleSubmit}>
        <h3>Add Category</h3>
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            value={categoryName}
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

        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export const AddSubCategoriesForm = () => {
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { AddSubCategoriesForm, displayCategories } = useAdminService();
  const token = sessionStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await displayCategories(token);
      return fetchedCategories || [];  
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const mutation = useMutation({
    mutationFn: async () => {
      await AddSubCategoriesForm(
        token,
        subCategoryName,
        description,
        parentCategoryId
      );
    },
    onSuccess: () => {
      setSubCategoryName("");
      setDescription("");
      setParentCategoryId("");
      setError("");
      setMessage("Subcategory added successfully!");
    },
    onError: (error) => {
      setError("Failed to add subcategory");
      console.error("Error adding subcategory:", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!parentCategoryId) {
      setError("Parent category is required");
      return;
    }
    if (!subCategoryName.trim()) {
      setError("Subcategory name is required");
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="add-category-form">
      <form onSubmit={handleSubmit}>
        <h3>Add Subcategory</h3>
        <div className="form-group">
          <label>Parent Category</label>
          <select
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option value="">Select parent category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Subcategory Name</label>
          <input
            type="text"
            value={subCategoryName}
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
        {message && <p className="success">{message}</p>}{" "}
        
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Adding..." : "Submit"} 
        </button>
      </form>
    </div>
  );
};
