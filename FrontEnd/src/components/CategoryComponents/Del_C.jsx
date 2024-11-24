import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./productstyle.css";
import { useAdminService } from "../../services/adminServices";
import { useMutation, useQuery } from "@tanstack/react-query"; 

export const Del_C = () => {
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [confirmationName, setConfirmationName] = useState("");
  const [message, setMessage] = useState("");
  const { deleteSubCategories, displayCategories } = useAdminService();
  const token = sessionStorage.getItem("token");
  const [showModal, setShowModal] = useState(false); 

  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: () => displayCategories(token),
    onSuccess: (data) => {
      if (data) {
        setCategoryId("");  
        setSubCategoryId(""); 
        setSubCategoryName("");  
      }
    }
  });

 
  const { mutate: deleteCategory, isLoading, isError, isSuccess } = useMutation({
    mutationFn: () => deleteSubCategories(token, categoryId, subCategoryId), 
    onSuccess: () => {
      setMessage("Subcategory deleted successfully!");
      setSubCategoryId("");   
      setSubCategoryName(""); 
      setConfirmationName("");  
      setShowModal(false);
    },
    onError: () => {
      setMessage("Failed to delete subcategory.");
    }
  });

  const handleDelete = () => {
    if (!subCategoryId) {
      setMessage("Please select a subcategory to delete.");
      return;
    }

    if (confirmationName.trim() !== subCategoryName.trim()) {
      setMessage("Subcategory name does not match.");
      return;
    }

    deleteCategory(confirmationName);
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setCategoryId(selectedCategoryId);
    setSubCategoryId(""); 
    setSubCategoryName("");  
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategoryId = e.target.value;
    setSubCategoryId(selectedSubCategoryId);

    const subCategory = categories
      .find((category) => category._id === categoryId)
      ?.subcategories.find((sub) => sub._id === selectedSubCategoryId);

    if (subCategory) {
      setSubCategoryName(subCategory.name);
    }

    setShowModal(true);  
    setConfirmationName("");  
  };

  const handleModalClose = () => setShowModal(false);

  if (categoriesLoading) {
    return <div>Loading categories...</div>;
  }

  if (categoriesError) {
    return <div>Error loading categories!</div>;
  }

  return (
    <div className="edit-category-form">
    
      <div className="form-group">
        <label>Select Category</label>
        <select value={categoryId} onChange={handleCategoryChange}>
          <option value="">Select parent category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
 
      {categoryId && (
        <div className="form-group">
          <label>Select Subcategory</label>
          <select value={subCategoryId} onChange={handleSubCategoryChange}>
            <option value="">Select subcategory</option>
            {categories
              .find((category) => category._id === categoryId)
              ?.subcategories.map((subCategory) => (
                <option key={subCategory._id} value={subCategory._id}>
                  {subCategory.name}
                </option>
              ))}
          </select>
        </div>
      )}
 
      {showModal && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Subcategory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete the "<strong>{subCategoryName}</strong>" subcategory?
            </p>
            <input
              type="text"
              value={confirmationName}
              onChange={(e) => setConfirmationName(e.target.value)}
              placeholder="Enter subcategory name to confirm"
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {message && <p className={`message ${isError ? 'error' : 'success'}`}>{message}</p>}
    </div>
  );
};
