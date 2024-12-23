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
    <div className="">
      <nav className="">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 bg-blue-950 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className="bg-blue-900 text-white w-40 h-10 rounded-lg text-white rounded-lg"
            >
              {tab.label}
            </button>
          ))}
        </div>
        
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
