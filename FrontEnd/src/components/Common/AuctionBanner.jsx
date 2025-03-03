import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Gavel } from 'lucide-react';
// import { useAuctions } from '../context/AuctionContext';

const AuctionBanner = () => {
//   const { auctions } = useAuctions();
  const navigate = useNavigate();
  
//   const activeAuctionsCount = auctions.filter(auction => auction.status === 'active').length;
  
//   if (activeAuctionsCount === 0) {
//     return null;
//   }
  
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg shadow-md mx-4 my-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          {/* <Gavel className="h-8 w-8 mr-3" /> */}
          <h2 className="text-xl font-bold">
            {/* 🔥 {activeAuctionsCount} Live {activeAuctionsCount === 1 ? 'Auction' : 'Auctions'}! Join Now */}Join Now
          </h2>
        </div>
        <button
          onClick={() => navigate('/auctions')}
          className="bg-white text-indigo-700 hover:bg-indigo-100 font-medium py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          View Auctions
        </button>
      </div>
    </div>
  );
};

export default AuctionBanner;