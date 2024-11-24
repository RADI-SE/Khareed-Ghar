import React, { useState } from "react";
import "./productstyle.css";
import { useAdminService } from "../../services/adminServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const EditSubCategoriesForm = () => {
  const [CategoryId, setCategoryId] = useState("");
  const [SubCategoryId, setSubCategoryId] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const { EditSubCategoriesForm, displayCategories } = useAdminService();
  const token = sessionStorage.getItem("token");

  const queryClient = useQueryClient();

  const { data: categories = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => displayCategories(token),
    staleTime: 0, 
  });

  const mutation = useMutation({
    mutationFn: ({ SubCategoryId, CategoryId, CategoryName, description }) =>
      EditSubCategoriesForm(token, SubCategoryId, CategoryId, CategoryName, description),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      refetch(); 
      setMessage("Subcategory updated successfully!");
      setSubCategoryId("");
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
    if (!SubCategoryId) {
      setMessage("Subcategory selection is required");
      return;
    }


    mutation.mutate({ SubCategoryId, CategoryId, CategoryName, description });
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setSubCategoryId(""); 
  };

  const handleSubCategoryChange = (e) => {
    setSubCategoryId(e.target.value);
    const subCategory = categories
      .find((category) => category._id === CategoryId)
      ?.subcategories.find((sub) => sub._id === e.target.value);

    if (subCategory) {
      setCategoryName(subCategory.name);
      setDescription(subCategory.description);
    }
  };

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (isError) {
    return <p>Error loading categories: {error.message}</p>;
  }

  return (
    <div className="edit-category-form">
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
          <h3>Edit SubCategory</h3>
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
