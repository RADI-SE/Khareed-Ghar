import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import defaultProduct from "../../assets/images/default.jpeg";
import { useFetchAuctionsById } from "../../hooks/seller/Auctions/useFetchAuctionsById";
import { toast } from 'react-hot-toast';

const AuctionDetail = () => {
  const { id } = useParams();
  const { data: auction, isLoading, isError } = useFetchAuctionsById(id);
  const [bidAmount, setBidAmount] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (isError || !auction) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-red-600 text-lg">Error loading auction details. Please try again later.</p>
      </div>
    );
  }

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const bidValue = parseFloat(bidAmount);
    const currentPrice = auction.currentPrice || auction.startingPrice;

    if (bidValue <= currentPrice) {
      toast.error('Bid amount must be higher than the current price');
      return;
    }

    // Here you would typically call your bid submission API
    toast.success('Bid placed successfully!');
    setBidAmount('');
  };

  const productImages = auction?.productId?.images 
    ? Array.isArray(auction.productId.images)
      ? auction.productId.images
      : [auction.productId.images]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2 p-6">
              <div className="relative h-[500px] overflow-hidden rounded-lg">
                <img
                  src={productImages[selectedImage] ? `/public/images/${productImages[selectedImage]}` : defaultProduct}
                  alt={auction?.productId?.name || 'Auction Item1'}
                  className="w-full h-full object-contain"
                />
              </div>
              {productImages.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-none w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={`/public/images/${image}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {auction?.productId?.name || 'Auction Item'}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    auction?.status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {auction?.status === 'ongoing' ? 'Active' : 'Ended'}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-600">Starting Price: ${auction?.startingPrice?.toFixed(2)}</p>
                  <p className="text-2xl font-bold text-blue-600">
                    Current Bid: ${(auction?.currentPrice || auction?.startingPrice)?.toFixed(2)}
                  </p>
                </div>

                <div className="border-t border-b border-gray-200 py-4">
                  <p className="text-gray-600">Ends: {new Date(auction?.endDate).toLocaleString()}</p>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                  <p className="text-gray-600">
                    {auction?.productId?.description || 'No description available'}
                  </p>
                </div>

                {auction?.status === 'ongoing' && (
                  <form onSubmit={handleBidSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700">
                        Enter your bid amount
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="bidAmount"
                          id="bidAmount"
                          step="0.01"
                          min={(auction.currentPrice || auction.startingPrice) + 0.01}
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter your bid"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Place Bid
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
