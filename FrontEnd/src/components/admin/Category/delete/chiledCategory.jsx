import React, { useState } from "react";
import { ConfirmationModal } from "../../../Common/confirmationModal/ConfirmationModel";
import { getSelectedCategoryName, isValidConfirmationName } from "../utils/utils"; 
import { useFetchCategories } from "../../../../hooks/Categories/useFetchCategories";
import { useDeleteSubCategory } from "../../../../hooks/Categories/useDeleteSubCategory";
import "../style.css";

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
    if (!categoryId) {
      alert("Category not found");
      return false;
    }

    if (!subcategoryId) {
      alert("Subcategory not found within the parent category");
      return false;
    }
    if( categoryId != null && subcategoryId != null){
      alert("Subcategory and associated products deleted successfully");
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

  const selectedCategoryName = getSelectedCategoryName(categories, categoryId);

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
          <select value={subcategoryId} onChange={handleSubCategoryChange}>
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
