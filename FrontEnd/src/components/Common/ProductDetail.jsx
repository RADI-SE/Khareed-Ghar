import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFetchProductById } from '../../hooks/seller/useFetchProductsById';
import { useAddToCart } from "../../hooks/buyer/cart/useAddToCart";
import { useSellerService, useStoreService } from "../../services/seller/sellerServices";
import { useBuyerService } from "../../services/buyer/buyerServices";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeedBackModal from "./FeedBackModal";
import { FaStar, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useFetchFeedbacks } from "../../hooks/feedback/useFetchFeedbacks";
import { useDeleteFeedback } from "../../hooks/feedback/useDeleteFeedback";
 
const ProductDetail = () => {
  const userid = sessionStorage.getItem("id");
  const { id } = useParams(); 
  const { data: product } = useFetchProductById(id);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const { getSimilarProducts } = useSellerService();
  const { sellerStore } = useStoreService();
  
  const [isInCart, setIsInCart] = useState(false);
  const { mutate: AddToCart } = useAddToCart();
  const [quantity, setQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [storeName, setStoreName] = useState('');
  const [showFeedBackModal, setShowFeedBackModal] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const { data:feedbacks, isLoading:loadingFeedbacks } = useFetchFeedbacks(id);

  const { addFeedback, updateFeedback } = useBuyerService();
  const { mutate: deleteFeedback } = useDeleteFeedback();
 
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    setQuantity(0);
    setIsInCart(false);
    
    const fetchStoreName = async () => {
      
        try {
          const storeData = await sellerStore(id);
          setStoreName(storeData);
        } catch (error) {
          console.error("Error fetching store data:", error);
          setStoreName('Store Name');
        }
      
    };
    
    fetchStoreName();
     
    const fetchSimilarProducts = async () => {
      try {
        const products = await getSimilarProducts(id);
        setSimilarProducts(products?.similarProducts || []);
      } catch (error) {
        console.error("Error fetching similar products:", error);
        setSimilarProducts([]);
      }
    };
    
    if (id) {
      fetchSimilarProducts();
    }
  }, [id, getSimilarProducts, product, sellerStore]);
  
  const productImages = Array.isArray(product?.images) 
    ? product?.images 
    : product?.images ? [product.images] : [];
    
  const handleSimilarProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    
    if (!userid) {
      toast.error("Please log in to add items to your cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    

    setQuantity((prev) => prev + 1); 
    AddToCart({ id:userid, productId, quantity: quantity + 1 });
    setIsInCart(true);
    
    toast.success(`${product?.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleSubmit = (data) => {
    if (editingFeedback) {
      console.log("Editing feedback", editingFeedback);
      updateFeedback({ 
        feedbackId: editingFeedback._id, 
        rating: data.rating, 
        comment: data.comment 
      });
      console.log("Updated feedback");
    } else {
      addFeedback(product._id, data.rating, data.comment);
    }
    setShowFeedBackModal(false);
    setEditingFeedback(null);
  }; 
  const filteredSimilarProducts = similarProducts.filter(p => p._id !== id);
 

  const handleDeleteClick = (feedback) => {
    try { 
      console.log("Feedback ID", feedback._id);
      deleteFeedback({ feedbackId: feedback._id });
      // optionally remove from UI or refetch
      console.log("Deleted feedback");
      
    } catch (error) {
      console.error("Delete failed", error);
    }
  }; 

  const handleUpdateClick = (feedback) => {
    setEditingFeedback(feedback);
    setShowFeedBackModal(true);
  };


  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row">
            {/* Image Gallery Section */}
            <div className="w-full md:w-1/2 relative">
              <div className="sticky top-0">
                {/* Main Image */}
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden p-4">
                  <img
                    src={`../../../../../public/images/${productImages[selectedImage]}` || 'https://placeholder.com/400'}
                    alt={`${product?.name} - Image ${selectedImage + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                {productImages.length > 1 && (
                  <div className="mt-4 px-4">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {productImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`flex-none w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImage === index ? 'border-blue-500 scale-105' : 'border-gray-200'
                          }`}
                        >
                          <img
                            src={`../../../../../public/images/${image}`}
                            alt={`${product?.name} thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 lg:p-8">
              <div className="space-y-6 sm:space-y-8">
                {/* Product Title and Price */}
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{product?.name}</h1>
                  <p className="text-2xl sm:text-3xl font-bold text-[#FFD700]">
                    ${product?.price?.toFixed(2)}
                  </p>
                </div>

                {/* Description */}
                <div className="border-t border-b border-gray-100 py-4 sm:py-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product?.description}
                  </p>
                </div>

                {/* Specifications */}
                {product?.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className="border-b border-gray-100 py-4 sm:py-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Specifications</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-sm text-gray-500 capitalize">{key}</span>
                          <span className="text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Seller Information */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Seller Information</h3>
                  <Link 
                    to={`/store/${product?.seller?._id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors no-underline"
                  >
                    <span className="mr-2 text-[#FFD700] text-lg hover:text-[#10C8B8]">{storeName?.sellerStore?.[0]?.storeName|| 'Store'}</span>
                  </Link>
                </div>

                {/* Add to Cart Button */}
                <div className="flex space-x-4">
                <button
                  onClick={(e) => handleAddToCart(e, product._id)}
                  disabled={isInCart}
                  className={`w-1/2 ${
                    isInCart 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#10C8B8] transform hover:scale-[1.02] active:scale-[0.98]'
                  } text-white py-3 sm:py-4 hover:text-[#FFD700] px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center text-base sm:text-lg font-semibold shadow-lg`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  {isInCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button
                onClick={() => setShowFeedBackModal(true)}
                  className="w-1/2 bg-white text-[#FFD700] p-3 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center text-base sm:text-lg font-semibold shadow-lg border border-3 hover:bg-gray-300"
                >
                  Review
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {filteredSimilarProducts.length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Similar Products
            </h2>
            <div className="relative">
              {/* Scroll Left Button */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 backdrop-blur-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Similar Products Grid */}
              <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 scrollbar-hide"
              >
                {filteredSimilarProducts.map((similarProduct) => (
                  <div
                    key={similarProduct._id}
                    onClick={() => handleSimilarProductClick(similarProduct._id)}
                    className="flex-none w-48 sm:w-56 md:w-64 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-40 sm:h-48 md:h-56 overflow-hidden">
                      <img
                        src={`../../../../../public/images/${similarProduct.images?.[0]}` || 'https://placeholder.com/400'}
                        alt={similarProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                        {similarProduct.name}
                      </h3>
                      <p className="text-lg sm:text-xl font-bold text-blue-600">
                        ${similarProduct.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll Right Button */}
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 backdrop-blur-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />

                </svg>
              </button>
            </div>
          </div>
        )}

                  {/* Product Reviews Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 mt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Product Reviews
            </h2>

            {loadingFeedbacks ? (
              <div className="flex justify-center items-center py-4">
                <p className="text-gray-500">Loading reviews...</p>
              </div>
            ) : feedbacks && feedbacks.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-6">Product Reviews</h3>
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-max border-collapse">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Rating</th>
                          <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Comment</th>
                          <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                          {userid && (
                            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Action</th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {feedbacks?.map((feedback) => (
                          <tr key={feedback._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, index) => (
                                  <FaStar
                                    key={index}
                                    className={`w-4 h-4 ${
                                      index < feedback.rating
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-700">{feedback.comment}</td>
                            <td className="px-6 py-4 text-gray-500">
                              {new Date(feedback.createdAt).toLocaleDateString()}
                            </td>
                            {userid && userid === feedback.userId.toString() && (
                              <>
                              <td className="px-6 py-4">
                                <button
                                  className="text-blue-500 hover:text-blue-700 transition-colors"
                                  onClick={() => handleUpdateClick(feedback)}
                                  title="Update review"
                                  >
                                  <FaEdit className="w-4 h-4" />
                                </button>
                              </td>

                              <td className="px-6 py-4">
                                <button
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                  onClick={() => handleDeleteClick(feedback)}
                                  title="Delete review"
                                >
                                  <FaTrashAlt className="w-4 h-4" />
                                </button>
                              </td>
                            </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center py-8">
                <p className="text-gray-500">No reviews yet.</p>
              </div>
            )}

          </div>
      </div>
      <FeedBackModal 
        isOpen={showFeedBackModal} 
        onClose={() => {
          setShowFeedBackModal(false);
          setEditingFeedback(null);
        }} 
        onSubmit={handleSubmit}
        initialData={editingFeedback}
      />
    </div>
  );
}

export default ProductDetail;
