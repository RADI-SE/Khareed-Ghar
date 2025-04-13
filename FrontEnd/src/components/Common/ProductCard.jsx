import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import defaultProduct from "../../assets/images/default.jpeg";
import { useAddToCart } from "../../hooks/buyer/cart/useAddToCart";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const ProductCard = ({product}) => {
  const { mutate: AddToCart } = useAddToCart();
  const [quantity, setQuantity] = useState(0); 
  const navigate = useNavigate();

  const handleDetail = (e, productId) => {
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
    <div
      key={product.id}
      className="relative mx-2 my-4 sm:mx-4 sm:my-6 md:mx-6 md:my-8 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
        <img
          src={`../../../public/images/${product?.images}` || defaultProduct}
          alt={product?.name || "Product"}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h5 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900 line-clamp-2">
          {product.name}
        </h5>
        
        <div className="mt-3 mb-4 flex items-center justify-between">
          <p className="text-2xl sm:text-3xl font-bold text-slate-900">
            ${product.price}
          </p>
          <div className="flex items-center">
            <FaStar className="h-5 w-5 text-yellow-300" />
          </div>
        </div>
        
        <div className="mt-auto space-y-2">
          <button
            onClick={(e) => handleAddToCart(e, product._id)}
            className="w-full py-2 px-4 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300 text-sm sm:text-base font-medium"
          >
            Add to Cart
          </button>
          
          <button
            onClick={(e) => handleDetail(e, product._id)}
            className="w-full py-2 px-4 border border-blue-900 text-blue-900 rounded-md hover:bg-blue-50 transition-colors duration-300 text-sm sm:text-base font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;


//  flex items-center justify-center w-10 h-10 
// bg-red-500 hover:bg-red-600 group text-white text-sm rounded-full 
// hover:w-32 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl
// transform hover:scale-105 cursor-pointer

// flex items-center justify-center w-24 h-10 
//           bg-gray-700 hover:bg-gray-800 text-white text-base font-medium rounded-full 
//           transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl
//           transform hover:scale-105 cursor-pointer gap-1