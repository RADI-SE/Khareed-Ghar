import React, { useState } from "react";
import DetailedProductView from "./dashboard/view";
import "./style.css";
import { AddForm } from "./create/AddZone";

function ZoneManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("main");

  const tabs = [
    { id: "main", label: "Main" },
    { id: "addZone", label: " Add a New Zone" },
  ];
  const handleTabChange = (tabId) => {
    setCurrentView(tabId);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "main":
        return <DetailedProductView />;
      case "addZone":
        break;
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
      {currentView === "addZone" && (
        <div className="add-category-form">
          {<AddForm />}
        </div>
      )}
    
      <div className="view-container">{renderCurrentView()}</div>
    </div>
  );
}

export default ZoneManagement;
