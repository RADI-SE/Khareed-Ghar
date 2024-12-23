import React, { useState } from "react";
import DetailedRegionView from "./dashboard/view";
import { AddForm } from "./create/AddRegion";

function RegionManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("main");

  const tabs = [
    { id: "main", label: "Main" },
    { id: "addRegion", label: " Add a New Region" },
  ];
  const handleTabChange = (tabId) => {
    setCurrentView(tabId);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "main":
        return <DetailedRegionView />;
      case "addRegion":
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
      {currentView === "addRegion" && (
        <div className="add-category-form">
          {<AddForm />}
        </div>
      )}
    
      <div className="view-container">{renderCurrentView()}</div>
    </div>
  );
}

export default RegionManagement;
