import React, { useState } from "react";
import "../style.css"; 
import { AddProductForm } from "./AddProducts";
function AddProduct() {
  const [currentView, setCurrentView] = useState("addProduct"); 
  return (
    <div className="add-category-form">
      <div className="tabs">
        <button
          onClick={() => {
            setCurrentView("AddProductsForm");  
          }}
        >
          Add Product
        </button>
      </div>
      {currentView === "AddProductsForm" && <AddProductForm />}
    </div>
  );
}

export default AddProduct;
