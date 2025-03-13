import React, { useState } from "react";
import { FaStar, FaClock, FaDollarSign, FaGavel } from "react-icons/fa";
import defaultProduct from "../../assets/images/default.jpeg";
import { useNavigate } from "react-router-dom";
import useBidSubmission from "../../hooks/seller/Auctions/useBidSubmission";

const AuctionCard = ({ auctions, onBidSuccess }) => {
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState("");
  const [currentBid, setCurrentBid] = useState(auctions.startingBid);
  const { submitBid, isSubmitting, error, setError } = useBidSubmission();

  const handleDetail = (e, auctionId) => {
    e.preventDefault();
    navigate(`/ongoing/${auctionId}`);
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const newBid = parseFloat(bidAmount);
    
    // Validate bid amount
    if (newBid <= currentBid) {
      setError("Your bid must be higher than the current bid!");
      return;
    }

    const result = await submitBid(auctions._id, newBid);
    
    if (result.success) {
      setCurrentBid(newBid);
      setBidAmount(""); // Reset input field
      // Notify parent component of successful bid if callback provided
      if (onBidSuccess) {
        onBidSuccess(newBid);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img
          src={auctions?.images ? `/images/${auctions.images}` : defaultProduct}
          alt={auctions?.name || "Auction Item"}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          <FaGavel className="inline-block mr-1" />
          Active Auction
        </div>
      </div>

      <div className="p-5 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 truncate">
          {auctions.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaDollarSign className="text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Current Bid</p>
              <p className="text-lg font-bold text-green-600">${currentBid.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock className="text-orange-500" />
            <div>
              <p className="text-sm text-gray-600">Ends In</p>
              <p className="text-sm font-semibold text-orange-500">
                {auctions.endTime ? formatDate(auctions.endTime) : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <FaStar className="text-yellow-400" />
          <span className="text-sm text-gray-600">
            Rating: {auctions.rating || "New"}
          </span>
        </div>

        <form onSubmit={handleBidSubmit} className="space-y-3">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                placeholder="Enter your bid"
                min={currentBid + 0.01}
                step="0.01"
                required
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              className={`${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'
              } text-white px-6 py-2 rounded-lg transition-colors duration-200 font-semibold whitespace-nowrap`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Placing Bid...' : 'Place Bid'}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <p className="text-xs text-gray-500">
            Minimum bid: ${(currentBid + 0.01).toFixed(2)}
          </p>
        </form>

        <button
          className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          onClick={(e) => handleDetail(e, auctions._id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default AuctionCard;
