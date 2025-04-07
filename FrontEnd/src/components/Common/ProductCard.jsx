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
        className="object-cover h-48 w-full"
      />
      <div className="mt-2 px-5 pb-2">
      <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
      <div className="mt-2 mb-5 flex">
        <p className="text-3xl font-bold text-slate-900">${product.price}</p>
        <div className="">
          <FaStar className="h-5 w-5 text-yellow-300"></FaStar>
        </div>
      </div>
   
      <div
          className=""
          onClick={(e) => handleAddToCart(e, product._id)}
        >
        <span className="flex justify-center cursor-pointer rounded-md bg-blue-900 p-2 mb-1 text-center text-sm font-medium text-white hover:bg-blue-800">
          Add to Cart
        </span>
      </div>
      <div
          className=""
          onClick={(e) => handleDetail(e, product._id)}
        >
        <span className="flex items-center justify-center cursor-pointer rounded-md bg-blue-900 p-2 text-center text-sm font-medium text-white hover:bg-blue-800">
          View</span>
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