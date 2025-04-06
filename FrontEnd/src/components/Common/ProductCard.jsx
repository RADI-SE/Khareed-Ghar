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
      className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
    >
      <img
        src={`../../../public/images/${product?.images}` ||  defaultProduct}
        alt={product?.name || "Product"}
        className="object-cover"
      />
      <div className="mt-4 px-5 pb-5">
      <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
      <div className="mt-2 mb-5 flex items-center justify-between">
        <p className="text-3xl font-bold text-slate-900">${product.price}</p>
        <div className="flex items-center">
          <FaStar className="h-5 w-5 text-yellow-300"></FaStar>
        </div>
      </div>
   
      <div
          className="absolute bottom-4 right-2 flex items-center rounded-md bg-blue-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
          onClick={(e) => handleAddToCart(e, product._id)}
        >
        <span className="">
          Add to Cart
        </span>
      </div>
      <div
          className=""
          onClick={(e) => handleDetail(e, product._id)}
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
        <span className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">View</span>
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