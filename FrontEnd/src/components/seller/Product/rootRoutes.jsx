import React, { useState } from "react";
import DetailedProductView from "./dashboard/view";
import { AddProductForm } from "./create/AddProducts";

function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("product");

  const tabs = [
    { id: "product", label: "Products" },
    { id: "addProduct", label: " + Add Product" },
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
      default:
        return null;
    }
  };
  return (
    <div className="">
      <nav className="fixed top-0 border-solid p-3 bg-white z-50 flex justify-around w-75">
        <div className="py-2 px-5 bg-blue-950 text-white font-semibold rounded-lg  hover:bg-blue-900 lg:col-span-2 lg:col-start-1">
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
            className="py-2 px-5 bg-gray-300 text-white font-semibold rounded-lg  hover:bg-gray-200"
          />
        )}
      </nav>
      {currentView === "addProduct" && (
        <div className="">
          {<AddProductForm />}
        </div>
      )}
    
      <div className="mt-5">{renderCurrentView()}</div>
    </div>
  );
}

export default ProductManagement;
