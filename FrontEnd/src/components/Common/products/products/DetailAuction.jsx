import React from 'react';
import { FaClock, FaDollarSign, FaUser, FaEdit, FaTrashAlt, FaCalendar } from 'react-icons/fa';
import { useCurrentLeftTime } from "../../../../hooks/seller/Auctions/useFetchCurrentLeftTime";

const DetailAuction = ({ 
  auction, 
  onBack, 
  onEdit, 
  onDelete,
  defaultImage = "/placeholder-image.jpg" 
}) => {
  const { data: currentLeftTime } = useCurrentLeftTime(auction?.auctionId);

  if (!auction) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No auction details available.</p>
      </div>
    );
  }

  // Format date for bid history
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <button
        className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        onClick={onBack}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Auctions
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left Column - Image */}
          <div className="md:w-1/2 relative">
            <div className="sticky top-0">
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src={`../../../../../public/images${auction.productsImg}` || defaultImage}
                  alt={auction.productsName}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Auction Details */}
          <div className="md:w-1/2 p-8 lg:p-12">
            <div className="space-y-8">
              {/* Product Title and Starting Bid */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{auction.productsName}</h1>
                <p className="text-3xl font-bold text-blue-600">
                  Starting Bid: ${auction.startingBid}
                </p>
              </div>

              {/* Timer Section */}
              <div className="bg-white rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <FaClock className="mr-2" />
                  Time Remaining
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">{currentLeftTime?.timeLeft?.days || "0"}</div>
                    <div className="text-sm text-blue-600">Days</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">{currentLeftTime?.timeLeft?.hours || "0"}</div>
                    <div className="text-sm text-blue-600">Hours</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">{currentLeftTime?.timeLeft?.minutes || "0"}</div>
                    <div className="text-sm text-blue-600">Minutes</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">{currentLeftTime?.timeLeft?.seconds || "0"}</div>
                    <div className="text-sm text-blue-600">Seconds</div>
                  </div>
                </div>
              </div>

              {/* Auction Times */}
              <div className="border-t border-b border-gray-100 py-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Auction Schedule</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">Start Time</span>
                    <p className="text-gray-900 font-medium">{auction.startTime}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">End Time</span>
                    <p className="text-gray-900 font-medium">{auction.endTime}</p>
                  </div>
                </div>
              </div>

              {/* Bid History */}
              <div className="border-b border-gray-100 py-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaDollarSign className="mr-2" />
                  Bid History
                </h3>
                <div className="overflow-x-auto">
                  {auction.bidders && auction.bidders.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bidder
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                            Date & Time
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {auction.bidders.map((bidder, index) => (
                          <tr key={index} className={index === 0 ? 'bg-green-50' : ''}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <FaUser className="text-gray-400 mr-2" />
                                <span className="text-sm text-gray-900">Bidder {index + 1}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <FaDollarSign className={`${index === 0 ? 'text-green-600' : 'text-gray-400'} mr-1`} />
                                <span className={`text-sm font-medium ${index === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                  {bidder.bidAmount}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                              <div className="flex items-center text-sm text-gray-500">
                                <FaCalendar className="mr-2" />
                                {formatDate(bidder.bidTime)}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              {index === 0 && (
                                <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                                  Current Bid
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No bids yet</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  onClick={() => onEdit(auction)}
                >
                  <FaEdit className="mr-2" />
                  Edit Auction
                </button>
                <button
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={() => onDelete(auction)}
                >
                  <FaTrashAlt className="mr-2" />
                  Delete Auction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAuction; 