import React from "react";
import { FaStar } from "react-icons/fa";
// import { addToCart } from "../slices/CartSlice";
import { useDispatch } from "react-redux";


const ProductCard = ({product}) => {
  const dispatch = useDispatch();
  return (
    <div
      key={product.id}
      className="bg-white p-4 shadow rounded relative border transform transition-transform duration-300 hover:scale-105"
    >
      <img
        src={product.image}
        alt=""
        className="w-full h-50 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-grey-500">${product.price}</p>
      <div className="flex item-center mt-2">
        <FaStar className="text-yellow-400"></FaStar>
        <FaStar className="text-yellow-400"></FaStar>
        <FaStar className="text-yellow-400"></FaStar>
        <FaStar className="text-yellow-400"></FaStar>
        <FaStar className="text-yellow-400"></FaStar>
      </div>
      <div className="absolute bottom-4 right-2 flex item-center justify-center w-5 h-5 bg-red-600 group text-white text-sm rounded-full hover:w-32 hover:bg-red-700 transition-a">
        <span className="group-hover:hiden">+</span>
        <span className="hidden group-hover:block cursor-pointer align-center justify-center">
          Detail
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
