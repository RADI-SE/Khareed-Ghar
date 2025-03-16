import React, { useEffect, useState, useRef } from "react";
import { useGetAllCategoryProducts } from "../../hooks/Categories/useGetAllCategoryProducts";
import { useGetCategoryById } from "../../hooks/Categories/searchCategoryById";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFetchProductById } from '../../hooks/seller/useFetchProductsById';
import { useAddToCart } from "../../hooks/buyer/cart/useAddToCart";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const userid = sessionStorage.getItem("id");
  const { id } = useParams(); 
  const { data: product } = useFetchProductById(id);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  
  const [isInCart, setIsInCart] = useState(false);
  const { mutate: AddToCart } = useAddToCart();
  const [quantity, setQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Reset state and scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    setQuantity(0);
    setIsInCart(false);
  }, [id]);
  
  // Convert single image to array if needed
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

  const {
    data: getAllCategoryProducts,
    isLoading: categoryProductsLoading,
    error: categoryProductsError,
  } = useGetAllCategoryProducts({ selectedCategory: product?.category?._id });

  const { data: getCategoryById } = useGetCategoryById({ selectedCategory: product?.category?._id });
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (getCategoryById) {
      setCategoryName(getCategoryById.name);
    }
  }, [getCategoryById]);

  if (!product || categoryProductsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (categoryProductsError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading data...
      </div>
    );
  }

  // Filter out the current product and ensure we have valid products
  const similarProducts = getAllCategoryProducts?.filter(p => p._id !== id) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            {/* Image Gallery Section */}
            <div className="md:w-1/2 relative">
              <div className="sticky top-0">
                {/* Main Image */}
                <div className="relative h-[500px] overflow-hidden">
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
                          className={`flex-none w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
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
            <div className="md:w-1/2 p-8 lg:p-12">
              <div className="space-y-8">
                {/* Product Title and Price */}
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{product?.name}</h1>
                  <p className="text-3xl font-bold text-blue-600">
                    ${product?.price?.toFixed(2)}
                  </p>
                </div>

                {/* Description */}
                <div className="border-t border-b border-gray-100 py-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product?.description}
                  </p>
                </div>

                {/* Specifications */}
                {product?.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className="border-b border-gray-100 py-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                    <div className="grid grid-cols-2 gap-4">
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
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Seller Information</h3>
                  <Link 
                    to={`/seller/${product?.seller?._id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="mr-2">{product?.seller?.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, product._id)}
                  disabled={isInCart}
                  className={`w-full ${
                    isInCart 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02] active:scale-[0.98]'
                  } text-white py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center text-lg font-semibold shadow-lg`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  {isInCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              More {categoryName || 'Similar Products'}
            </h2>
            <div className="relative">
              {/* Scroll Left Button */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 backdrop-blur-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Scroll Right Button */}
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 backdrop-blur-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-6 scroll-smooth scrollbar-hide px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {similarProducts.map((similarProduct) => (
                  <div 
                    key={similarProduct._id} 
                    className="flex-none w-64 cursor-pointer"
                    onClick={() => handleSimilarProductClick(similarProduct._id)}
                  >
                    <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                      <div className="aspect-w-1 aspect-h-1">
                        <img
                          src={`../../../../../public/images/${similarProduct.images}`}
                          alt={similarProduct.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                          {similarProduct.name}
                        </h3>
                        <p className="text-blue-600 font-bold">
                          ${similarProduct.price?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
