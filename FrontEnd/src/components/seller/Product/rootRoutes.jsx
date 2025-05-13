import React, { useState } from "react";
import DetailedProductView from "./dashboard/view";
import { AddProductForm } from "./create/AddProducts";
import AuctionTable from "../../Common/products/products/AuctionTable";


function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("DetailedProductView");

  const tabs = [
    { id: "DetailedProductView", label: "Product View" },
    { id: "addProduct", label: " Add a New Product" },
    { id: "AuctionView", label: " Auction View" },
  ];
  const handleTabChange = (tabId) => {
    setCurrentView(tabId);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "DetailedProductView":
        return <DetailedProductView />;
      case "addProduct":
        return <AddProductForm />;
      case "AuctionView":
        return <AuctionTable />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <nav className="">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 bg-gray-100 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className="bg-[#10C8B8] text-white w-30 h-10 px-3 rounded-lg text-white rounded-lg hover:bg-[#0eb2a6]"
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


export default ProductManagement;
