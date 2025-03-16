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
      className="bg-white p-4 shadow rounded relative border transform transition-transform duration-300 hover:scale-105"
    >
      <img
        src={`../../../public/images/${product?.images}` ||  defaultProduct}
        alt={product?.name || "Product"}
        className="w-full h-50 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-grey-500">${product.price}</p>
      <div className="flex item-center mt-2">
        <FaStar className="text-yellow-400"></FaStar>
      </div>
   
      <div
          className="absolute bottom-4 right-2 flex items-center justify-center w-10 h-10 
          bg-red-500 hover:bg-red-600 group text-white text-sm rounded-full 
          hover:w-32 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl
          transform hover:scale-105 cursor-pointer"
          onClick={(e) => handleAddToCart(e, product._id)}
        >
        <span className="group-hover:hidden text-xl font-semibold">+</span>
        <span className="hidden group-hover:block font-medium">
          Add to Cart
        </span>
      </div>
      <div
          className="absolute bottom-4 left-2 flex items-center justify-center w-24 h-10 
          bg-gray-700 hover:bg-gray-800 text-white text-base font-medium rounded-full 
          transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl
          transform hover:scale-105 cursor-pointer gap-1"
          onClick={(e) => handleDetail(e, product._id)}
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
        <span>View</span>
      </div>
    </div>
  );
}

export default ProductCard;
