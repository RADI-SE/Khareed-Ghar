import React, { useState } from "react";
import "../style.css";
import { ConfirmationModal } from "../../Common/category/confirmationModal/ConfirmationModel";
import { getSelectedCategoryName, isValidConfirmationName } from "../utils/utils";
import { useFetchCategories } from "../../../hooks/Categories/useFetchCategories";
import { useDeleteCategory } from "../../../hooks/Categories/useDeleteCategory";

export const Del_P = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setConfirmationName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const token = sessionStorage.getItem("token");

  const {
    data: categories = [],  
    isLoading: categoriesLoading,
    isError: categoriesError,
    refetch,
  } = useFetchCategories(token);

  const {
    mutate: deleteCategory,
    isLoading: deleteCategoryLoading,
    isError: deleteCategoryError,
  } = useDeleteCategory(token);

  const handleDelete = () => {
    const selectedCategoryName = getSelectedCategoryName(categories, selectedCategory);
    if (!isValidConfirmationName(name, selectedCategoryName)) {
      setModalMessage("Category name does not match. Please try again.");
      return;
    }
    
    deleteCategory(
      { name, categoryId: selectedCategory },
      {
        onSuccess: () => {
          setModalMessage("Category deleted successfully!");
          setShowModal(false);
          refetch();
        },
        onError: () => {
          setModalMessage("Failed to delete category. Please try again.");
        },
      }
    );
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setShowModal(true);
    setConfirmationName("");
    setModalMessage("");
  };

  if (categoriesError) return <p>Failed to fetch categories. Please try again later.</p>;
  if (categoriesLoading) return <p>Loading categories...</p>;

  const selectedCategoryName = getSelectedCategoryName(categories, selectedCategory);

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
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {showModal && (
        <ConfirmationModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
          isLoading={deleteCategoryLoading}
          modalMessage={modalMessage}
          confirmationName={name}
          setConfirmationName={setConfirmationName}
          selectedCategoryName={selectedCategoryName}
        />
      )}

      {deleteCategoryError && (
        <p className="error-message">Failed to delete category. Please try again.</p>
      )}
    </div>
  );
};
