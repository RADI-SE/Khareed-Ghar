import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import defaultProduct from "../../assets/images/default.jpeg";
import { useFetchAuctionsById } from "../../hooks/seller/Auctions/useFetchAuctionsById";
import { useFetchProductById } from '../../hooks/seller/useFetchProductsById';
import { toast } from 'react-hot-toast';
import { useBidNow } from '../../hooks/seller/Auctions/useBidNow';
import { useCurrentLeftTime } from '../../hooks/seller/Auctions/useFetchCurrentLeftTime';
import { FaClock } from 'react-icons/fa';
import { useAuthService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useSellerService } from '../../services/seller/sellerServices';
import AuctionCard from './AuctionCard';


const AuctionDetail = () => {
  const { id } = useParams();
  const { data: auction, isLoading, isError } = useFetchAuctionsById(id);
  const [bidAmount, setBidAmount] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const {data:product} = useFetchProductById(auction?.auction?.productId);
  const { data: currentLeftTime } = useCurrentLeftTime(id);
  const scrollContainerRef = useRef(null);
  const [similarAuctions, setSimilarAuctions] = useState([]);
  const navigate = useNavigate();
  const { getSimilarProducts } = useSellerService();
  const { isAuthenticated, user } = useAuthService();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log(user);
    }

    const fetchSimilarProducts = async () => {
      try {
        const products = await getSimilarProducts(id);
        console.log("test 182r:::::::::::::::::::::::::::::", products);
        setSimilarAuctions(products || []);
      } catch (error) {
        console.error("Error fetching similar products:", error);
        setSimilarAuctions([]);
      }
    };

    if (id) {
      fetchSimilarProducts();
    } 
  }, [isAuthenticated, user, getSimilarProducts, id]);
  const { mutate: bidNow } = useBidNow();

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

  const handleSimilarProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const bidValue = parseFloat(bidAmount);
    const currentPrice = auction?.auction?.currentBid || auction?.auction?.startingBid;

    if (bidValue <= currentPrice && isAuthenticated && user) {
      toast.error('Bid amount must be higher than the current price');
      return;
    }
    if(isAuthenticated && user){  
      bidNow({
        auctionId: id,
        bidAmount: bidValue,
      });
      toast.success('Bid placed successfully!');
    }else{
      toast.error('Please login to bid');
      navigate('/auth/signin');
    }
    setBidAmount('');
  };


  console.log("similarAuctions::::::::::::",similarAuctions);

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
            {/* Left Section - Image and Bidders Table */}
            <div className="md:w-1/2 p-6 space-y-8">
              {/* Image Section */}
              <div>
                <div className="relative h-[300px] overflow-hidden rounded-lg">
                  <img
                    src={product?.[selectedImage] ? `/images/${product?.[selectedImage]}` : defaultProduct}
                    alt={product?.name || 'Auction Item1'}
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

              {/* Bidders Table */} 
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-4 py-2 sm:px-6 bg-[#10C8B8]">
                  <h3 className="text-lg font-medium leading-6 text-white">Auction Bidders</h3>
                  <p className="mt-1 max-w-2xl text-sm text-white">List of all bids placed on this item</p>
                </div>
                <div className="border-t border-gray-200">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidder</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="max-h-[144px] overflow-y-auto">
                    
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200 ">
                          {auction?.auction?.bidders ? [...auction.auction.bidders].reverse().map((bidder) => (
                            <tr key={bidder._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/3">{bidder.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/3">${bidder.bidAmount.toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/3">
                                {new Date(bidder.bidTime).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit',
                                  hour12: true 
                                })}
                              </td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No bids placed yet</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-6 border-l border-gray-200">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                    {product?.name || 'Auction Item'}
                  </h1>
                  
                </div>

                <div className="space-y-2">
                  <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">Starting Price: ${auction?.auction?.startingBid?.toFixed(2)}</h6>
                  <p className="text-lg font-medium leading-8 text-[#10C8B8] mb-4">
                    Current Bid: ${(auction?.auction?.currentBid || auction?.auction?.startingBid)?.toFixed(2)}
                  </p>
                </div>
<div className="bg-white rounded-lg">
                <h3 className="text-lg font-semibold text-[#10C8B8] mb-4 flex items-center">
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






                <div className="prose max-w-none">
                  <h3 className="text-gray-900 text-lg leading-8 font-medium mb-4">Description</h3>
                  <p className="text-gray-500 text-base font-normal mb-5">
                    {product?.description || 'No description available'}
                  </p>
                </div>
                {auction?.auction?.status === "ongoing" && (
                  <div className="w-full max-w-sm min-w-[200px]">
                    {/* Bidding input field */}
                    <label className="text-gray-900 text-lg leading-8 font-medium mb-4">
                      Bid Here 
                    </label>

                    <input
                      type="number"
                      placeholder="Bid must be higher than current bid"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10C8B8] block w-full p-2.5"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />

                    <button
                      onClick={handleBidSubmit}
                      className="text-white bg-[#10C8B8] hover:bg-[#0eb2a6] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2"
                    >
                      SUBMIT
                    </button>
                  </div>
                )}
                {auction?.auction?.status === "completed" && (
                  <p className="text-gray-900 text-lg leading-8 font-medium mb-4">
                    Auction is completed
                  </p>
                )}
                
              </div>
            </div>
          </div>
          </div>


          {/* Other Auctions */}
          <div className="bg-white my-5 rounded-2xl shadow overflow-hidden">
            <h3 className='px-3 py-2'>Other Auctions</h3>
          
          <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-4 sm:gap-6 p-3 shadow scrollbar-hide"
              >
                {similarAuctions.map((auction) => (
                  <AuctionCard key={auction._id} auctions={auction} />
                ))}
              </div>
              </div>
        
      </div>
    </div>
  );
};

export default AuctionDetail;
