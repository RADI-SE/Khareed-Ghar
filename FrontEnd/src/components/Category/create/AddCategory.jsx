import React, { useState } from "react";
import "../style.css"; 
 import { AddSubCategoriesForm } from "./chiledCategory";
import { AddCategoryForm } from "./parentCategory";
function AddCategory() {
  const [currentView, setCurrentView] = useState("addCategory"); 
  return (
    <div className="add-category-form">
      <div className="tabs">
        <button
          onClick={() => {
            setCurrentView("AddCategoriesForm");  
          }}
        >
          Add Category
        </button>
        <button
          onClick={() => {
            setCurrentView("AddSubCategoriesForm");
          }}
        >
          Add SubCategory
        </button>
      </div>
      {currentView === "AddCategoriesForm" && <AddCategoryForm />}
      {currentView === "AddSubCategoriesForm" && <AddSubCategoriesForm />}
    </div>
  );
}

export default AddCategory;
