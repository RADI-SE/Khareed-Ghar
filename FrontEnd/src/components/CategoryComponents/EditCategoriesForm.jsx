import React, { useState } from "react";
import "./productstyle.css";
import { useAdminService } from "../../services/adminServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const EditCategoriesForm = () => {
  const [CategoryId, setCategoryId] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const { EditCategoriesForm, displayCategories } = useAdminService();
  const token = sessionStorage.getItem("token");

  const queryClient = useQueryClient();
 
  const { data: categories = [], isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => displayCategories(token),
    staleTime: 60000, // Cache data for 1 minute
  });
 
  const mutation = useMutation({
    mutationFn: ({ token, CategoryId, CategoryName, description }) =>
      EditCategoriesForm(token, CategoryId, CategoryName, description),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      setMessage("Subcategory updated successfully!");
      setCategoryName("");
      setDescription("");
    },
    onError: () => {
      setMessage("Failed to update subcategory.");
    },
  });

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
    mutation.mutate({ token, CategoryId, CategoryName, description });
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setCategoryName("");
    setDescription("");
    setMessage("");
  };

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (isError) {
    return <p>Error loading categories: {error.message}</p>;
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
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};
