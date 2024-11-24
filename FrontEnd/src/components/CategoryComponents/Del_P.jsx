import React, { useState } from "react";
import "./productstyle.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";
import { Modal, Button } from "react-bootstrap";

export const Del_P = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [confirmationName, setConfirmationName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");  
  const token = sessionStorage.getItem("token");
  const { displayCategories, deleteCategories } = useAdminService();

  const queryClient = useQueryClient();

   
  const { data: category = [], isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => displayCategories(token),
    staleTime: 5 * 60 * 1000,  
  });

  
  const deleteCategoryMutation = useMutation({
    mutationFn: ({ token, confirmationName, selectedCategory }) =>
      deleteCategories(token, confirmationName, selectedCategory),
    onSuccess: () => {
      setModalMessage("");
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ["categories"] }); 
    },
    onError: () => {
      setModalMessage("Failed to delete category. Please try again.");
    },
  });

  const handleDelete = () => {
    if (!selectedCategory) {
      setModalMessage("No category selected for deletion.");
      return;
    }

    const selectedCategoryName = category.find((cat) => cat._id === selectedCategory)?.name.trim();
    if (confirmationName.trim() !== selectedCategoryName) {
      setModalMessage("Category name does not match. Please try again.");
      return;
    }

    deleteCategoryMutation.mutate({ token, confirmationName, selectedCategory });
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    setShowModal(true);  
    setConfirmationName("");  
    setModalMessage("");  
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalMessage(""); 
  };

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (isError) {
    return <p>Failed to fetch categories. Please try again later.</p>;
  }

  return (
    <div className="delete-category-container">
      <h2 className="delete-category-title">Delete Category</h2>

      <div className="form-group">
        <label htmlFor="category-select" className="form-label">
          Select Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="form-control"
        >
          <option value="">-- Select a Category --</option>
          {category.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Modal for confirmation */}
      {showModal && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete the category "
              <strong>{category.find((cat) => cat._id === selectedCategory)?.name}</strong>"?
            </p>
            <p>
              <strong>Note:</strong> Enter the category name exactly as confirmation.
            </p>
            <input
              type="text"
              value={confirmationName}
              onChange={(e) => setConfirmationName(e.target.value)}
              placeholder="Enter category name"
              className="form-control"
            />
            {modalMessage && <p className="modal-feedback">{modalMessage}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={deleteCategoryMutation.isLoading || !confirmationName.trim()}
            >
              {deleteCategoryMutation.isLoading ? "Deleting..." : "Delete"}
            </Button>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
