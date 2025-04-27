import React, { useState } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import defaultProduct from "../../assets/images/default.jpeg";
import { useAddToCart } from "../../hooks/buyer/cart/useAddToCart";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';


const ProductCard = ({ product }) => {
  const { mutate: AddToCart } = useAddToCart();
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();


  const handleDetail = async (e, productId) => {
    e.preventDefault();
    navigate(`/products/${productId}`);
  }

  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    setQuantity((prev) => prev + 1);
    AddToCart({ productId, quantity: quantity + 1 });
    toast.success(`Product added to Cart (Quantity: ${quantity + 1})`);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden border border-2 border-blue-900">
        <img
          src={`../../../public/images/${product?.images}` || defaultProduct}
          alt={product?.name || "Product"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="text-base font-medium text-gray-900 mb-1.5 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-bold text-gray-900">
            ${product.price}
          </p>
          <div className="flex items-center">
            <FaStar className="w-3.5 h-3.5 text-yellow-400" />
            <span className="ml-1 text-xs text-gray-600">4.5</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1.5">
          <button
            onClick={(e) => handleAddToCart(e, product._id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300 text-sm"
          >
            <FaShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
          
          <button
            onClick={(e) => handleDetail(e, product._id)}
            className="flex-1 py-1.5 px-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300 text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;