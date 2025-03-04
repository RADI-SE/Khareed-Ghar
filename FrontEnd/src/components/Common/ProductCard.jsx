import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import defaultProduct from "../../assets/images/default.jpeg";
import { useAddToCart } from "../../hooks/buyer/cart/useAddToCart";
import { useNavigate } from "react-router-dom";
const ProductCard = ({product}) => {
  const { mutate: AddToCart } = useAddToCart();
  const id = sessionStorage.getItem("id");
  const [quantity, setQuantity] = useState(0); 
  const navigate = useNavigate();

  const handleDetail = (e, productId) => {
    e.preventDefault();
    navigate(`/products/${productId}`);
  }
  const handleAddToCart = (e, productId) => {

    e.preventDefault();
  
    setQuantity((prev) => prev + 1); 
  
    AddToCart({ id, productId, quantity: quantity + 1 });
    alert(`Product added to Cart. Quantity: ${quantity + 1}`);
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
          className="absolute bottom-4 right-2 flex item-center justify-center w-10 h-10 
      bg-red-600 group text-white text-sm rounded-full hover:w-32 hover:bg-red-700 transition-all
       duration-100"
          onClick={(e) => handleAddToCart(e, product._id)}
        >
        <span className="group-hover:hidden">+</span>
        <span className="hidden group-hover:block cursor-pointer align-center justify-center">
          Detail
        </span>
      </div>
      <div
          className="absolute bottom-4 left-2 flex item-center justify-center w-20 h-10 
      bg-red-600 group text-white text-lg rounded-full "
          onClick={(e) => handleDetail(e, product._id)}
        >
         
        <span className=" cursor-pointer align-center justify-center">
        View
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
