import React, { useState } from "react";
import AuctionListPage from "../../../pages/AuctionListPage"
import { AddAuctions } from "./create/AddAuctions";

function AuctionManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("DetailedProductView");

  const tabs = [
    { id: "AuctionListPage", label: "Your Auctions" },
    { id: "addAuction", label: " Add New Auction" },
  ];
  const handleTabChange = (tabId) => {
    setCurrentView(tabId);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "AuctionListPage":
        return <AuctionListPage />;
      case "addAuction":
        return <AddAuctions />;
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
 

      <div className="view-container">{renderCurrentView()}</div>
    </div>
  );
}


export default AuctionManagement;