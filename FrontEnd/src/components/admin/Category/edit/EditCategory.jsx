import React, { useState } from 'react';
import '../style.css';
import { EditCategoriesForm } from "./parentCategory.jsx";
import {EditSubCategoriesForm} from "./chiledCategory.jsx";

function EditCategory() {
  const [currentView, setCurrentView] = useState("editCategory"); 
  return (
    <div className="add-category-form">
      <div className="tabs">
        <button
        className="bg-[#10C8B8]"
          onClick={() => {
            setCurrentView("EditCategoriesForm");  
          }}
        >
          Edit Category
        </button>
        <button
        className="bg-[#10C8B8]"
          onClick={() => {
            setCurrentView("EditSubCategoriesForm");
          }}
        >
          Edit SubCategory
        </button>
      </div>
      {currentView === "EditCategoriesForm" && <EditCategoriesForm />}
      {currentView === "EditSubCategoriesForm" && <EditSubCategoriesForm />}
    </div>
  );
}

export default EditCategory;
