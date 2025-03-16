import { useState } from "react";
import { FaClock, FaDollarSign, FaGavel, FaUser } from "react-icons/fa";
import defaultProduct from "../../assets/images/default.jpeg";
import useBidSubmission from "../../hooks/seller/Auctions/useBidSubmission";

const ChangeAuction = ({ setIsModelOpen, selectedAuction }) => {
  const [bidAmount, setBidAmount] = useState("");
  const { submitBid, isSubmitting, error, setError } = useBidSubmission();

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const newBid = parseFloat(bidAmount);

    if (newBid <= selectedAuction.currentBid) {
      setError("Your bid must be higher than the current bid!");
      return;
    }

    const result = await submitBid(selectedAuction._id, newBid);
    if (result.success) {
      setBidAmount("");
      setIsModelOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl gap-6 p-6 bg-white shadow-xl rounded-lg">

      <div className="w-full md:w-1/2">
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <img
            src={
              selectedAuction?.productId?.images?.[0]
                ? `/public/images/${selectedAuction.productId.images[0]}`
                : defaultProduct
            }
            alt={selectedAuction?.productId?.name || "Auction Item"}
            className="w-full h-[180px] object-contain bg-gray-100"
          />
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
            <FaGavel className="mr-1" /> Active Auction
          </div>
        </div>
      </div>
 
      {/* Details Section */}
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {selectedAuction?.productId?.name || "Auction Item"}
        </h2>
        <p className="text-gray-600">
          {selectedAuction?.productId?.description || "No description available."}
        </p>
        {[
          { icon: FaDollarSign, color: "text-green-600", label: "Current Bid", value: `$${selectedAuction?.currentBid?.toFixed(2)}` },
          { icon: FaClock, color: "text-orange-500", label: "Ends In", value: selectedAuction?.endTime || "N/A" },
          { icon: FaUser, color: "text-blue-600", label: "Highest Bidder", value: selectedAuction?.currentBidder || "No bids yet" },
          { icon: FaDollarSign, color: "text-purple-600", label: "Starting Bid", value: `$${selectedAuction?.startingBid?.toFixed(2)}` }
        ].map(({ icon: Icon, color, label, value }, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon className={`${color} text-lg`} />
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-sm font-semibold">{value}</p>
            </div>
          </div>
        ))}

        <form onSubmit={handleBidSubmit} className="space-y-4">
        
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your bid amount"
              min={selectedAuction?.currentBid + 0.01}
              step="0.01"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Error & Bid Info */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p className="text-sm text-gray-500">
            Minimum bid: ${(selectedAuction?.currentBid + 0.01).toFixed(2)}
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setIsModelOpen(false)}
              className="flex-1 px-4 h-12 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 h-12 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:bg-blue-400"
            >
              {isSubmitting ? "Placing Bid..." : "Place Bid"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeAuction;
