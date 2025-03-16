import React, { useState } from "react";
import defaultProduct from "../../assets/images/default.jpeg";
import Modal from "../../components/Common/Modal";
import ChangeAuction from "../../components/Common/AuctionModal";

const AuctionCard = ({ auctions }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);

  const handleAuctionChange = (newAuction) => {
    setSelectedAuction(newAuction);
  };

  return (

    <div className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
 
  <div className="relative">
    <img
      src={auctions?.productId?.images?.[0] ? `/public/images/${auctions.productId.images[0]}` : defaultProduct}
      alt={auctions?.productId?.name || "Auction Item"}
      className="w-full h-56 object-cover"
    />

    
    <div
      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
        auctions?.status === "ongoing" ? "bg-green-600 text-white" : "bg-gray-400 text-white"
      }`}
    >
      {auctions?.status === "ongoing" ? "Active" : "Inactive"}
    </div>
  </div>

  
  <div className="px-5 py-4 space-y-2 text-center">
    
    <h3 className="text-lg font-semibold text-gray-800">{auctions?.productId?.name || "Auction Item"}</h3>

    
    <button
      onClick={() => {
        setIsModelOpen(true);
        setSelectedAuction(auctions);
      }}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
    >
      View More
    </button>
  </div>

  
  <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
    <ChangeAuction
      setAuction={handleAuctionChange}
      setIsModelOpen={setIsModelOpen}
      initialAuction={selectedAuction?.auction || ""}
      selectedAuction={selectedAuction}
    />
  </Modal>
</div>

  );
};

export default AuctionCard;
