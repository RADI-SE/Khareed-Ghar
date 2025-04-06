import React from "react";
import defaultProduct from "../../assets/images/default.jpeg";
import { useNavigate } from "react-router-dom";

const AuctionCard = ({ auctions }) => {
  const navigate = useNavigate();

  const handleDetail = (e, auctionId) => {
    e.preventDefault();
    navigate(`/auction/${auctionId}`);
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
        <p className="text-gray-600">Current Bid: ${auctions?.currentPrice || auctions?.startingPrice}</p>
        
        <button
          onClick={(e) => handleDetail(e, auctions._id)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default AuctionCard;