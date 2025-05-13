import React, { useState } from "react";
import { ConfirmationModal } from "../../../Common/confirmationModal/ConfirmationModel";
import { getSelectedCategoryName, isValidConfirmationName } from "../utils/utils"; 
import { useFetchCategories } from "../../../../hooks/Categories/useFetchCategories";
import { useDeleteSubCategory } from "../../../../hooks/Categories/useDeleteSubCategory";
import "../style.css";
import toast from 'react-hot-toast';

export const Del_C = () => {
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [confirmationName, setConfirmationName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const token = sessionStorage.getItem("token");

  const {
    data: categories,
    isLoading: categoriesLoading,
    refetch,
  } = useFetchCategories(token);

  const {
    mutate: deleteCategory,
    isLoading: deleteCategoryLoading,
    isError: deleteCategoryError,
  } = useDeleteSubCategory(token);

  const handleDelete = () => {
    if (!isValidConfirmationName(confirmationName, subCategoryName)) {
      setMessage("Subcategory name does not match.");
      return;
    }
 

    deleteCategory(
      { categoryId, subcategoryId },
      {
        onSuccess: () => {
          setMessage("Subcategory deleted successfully!");
          setShowModal(false);
          refetch(); 
        },
        onError: () => {
          setMessage("Failed to delete subcategory.");
        },
      }
    );
  };

  const handleModalClose = () => {
    setShowModal(false);
    setConfirmationName("");
    setMessage("");
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setSubCategoryId("");
    setSubCategoryName("");
    setConfirmationName("");
    setShowModal(false);
    setMessage("");
  };

  const handleSubCategoryChange = (e) => {
    setSubCategoryId(e.target.value);
    const selectedSubCategory = categories
      .find(cat => cat._id === categoryId)
      ?.subcategories
      .find(sub => sub._id === e.target.value);
    if (selectedSubCategory) {
      setSubCategoryName(selectedSubCategory.name);
      setShowModal(true);
      setConfirmationName("");
      setMessage("");
    }
  };

  if (categoriesLoading) return <p>Loading categories...</p>;

  const selectedCategory = categories.find(cat => cat._id === categoryId);
  const subcategories = selectedCategory?.subcategories || [];

  return (
    <div className="delete-category-container">
      <h2 className="delete-category-title">Delete Subcategory</h2>
      <div className="form-group">
        <label htmlFor="category-select" className="form-label">
          Select Parent Category:
        </label>
        <select
          id="category-select"
          value={categoryId}
          onChange={handleCategoryChange}
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10C8B8] focus:border-transparent"
        >
          <option value="">-- Select a Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {categoryId && (
        <div className="form-group">
          <label htmlFor="subcategory-select" className="form-label">
            Select Subcategory:
          </label>
          <select
            id="subcategory-select"
            value={subcategoryId}
            onChange={handleSubCategoryChange}
            className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10C8B8] focus:border-transparent"
          >
            <option value="">-- Select a Subcategory --</option>
            {subcategories.map((subcat) => (
              <option key={subcat._id} value={subcat._id}>
                {subcat.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {showModal && (
        <ConfirmationModal
          show={showModal}
          onClose={handleModalClose}
          onConfirm={handleDelete}
          isLoading={deleteCategoryLoading}
          modalMessage={message}
          confirmationName={confirmationName}
          setConfirmationName={setConfirmationName}
          selectedName={subCategoryName}
        />
      )}

      {deleteCategoryError && (
        <p className="error-message">Failed to delete subcategory. Please try again.</p>
      )}
    </div>
  );
};
