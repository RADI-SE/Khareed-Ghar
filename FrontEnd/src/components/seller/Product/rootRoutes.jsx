import React, { useState } from "react";
import DeleteCategory from "./delete/DeleteCategory";
import DetailedProductView from "./dashboard/view";
import "./style.css";
import { AddProductForm } from "./create/AddProducts";

function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("category");

  const tabs = [
    { id: "product", label: "Products" },
    { id: "addProduct", label: " + Add Product" },
    { id: "deleteCategory", label: "Delete Category" },
  ];
  const handleTabChange = (tabId) => {
    setCurrentView(tabId);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "product":
        return <DetailedProductView />;
      case "addProduct":
        break;
      case "deleteCategory":
        return <DeleteCategory />;
      default:
        return null;
    }
  };
  return (
    <div className="product-management">
      <nav className="navbar">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {currentView === "product" && (
          <input
            type="text"
            placeholder="Search by ID"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="search-bar"
          />
        )}
      </nav>
      {currentView === "addProduct" && (
        <div className="add-category-form">
          {<AddProductForm />}
        </div>
      )}
      



      <div className="view-container">{renderCurrentView()}</div>
    </div>
  );
}

export default ProductManagement;
