import React, { useEffect, useState } from "react";
import { useGetAllCategoryProducts } from "../../hooks/Categories/useGetAllCategoryProducts";
import ProductCard from "./ProductCard";
import { useGetCategoryById } from "../../hooks/Categories/searchCategoryById";
import { Link, useParams } from 'react-router-dom'; // Import useParams
import { useFetchProductById } from '../../hooks/seller/useFetchProductsById';
import { useAddToCart } from "../../hooks/buyer/cart/useAddToCart";

// const { mutate: AddToCart } = useAddToCart();


const ProductDetail = () => {
  
  const userid = sessionStorage.getItem("id");
  const { id } = useParams(); 
  const { data: product, } = useFetchProductById(id);
  
  const [isInCart, setIsInCart] = useState(false);
  const { mutate: AddToCart } = useAddToCart();
  const [quantity, setQuantity] = useState(0);
    
  const handleAddToCart = (e, productId) => {

    e.preventDefault();
    
    if (!userid) {
      alert("You must be logged in to add items to the cart.");
      return;
    }
    setQuantity((prev) => prev + 1); 
  
    AddToCart({ id:userid, productId, quantity: quantity + 1 });
    alert(`Product added to Cart. Quantity: ${quantity + 1}`);
  };



    const {
        data: getAllCategoryProducts,
        isLoading,
        error,
      } = useGetAllCategoryProducts("676a5f4b8aea5a11357aeff5");
    
      const { data: getCategoryById } = useGetCategoryById("676a5f4b8aea5a11357aeff5");
    
      // const [count, setCount] = useState("");
      const [categoryName, setCategoryName] = useState("");
    
      useEffect(() => {
       
        if (getCategoryById) {
          // setCount(`Found ${getAllCategoryProducts?.length} products`);
          setCategoryName(getCategoryById.name);
        }
      }, [getAllCategoryProducts]);
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error loading data...</div>;
      }
    return (
        <>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={`../../../../../public/images/${product?.images}` || 'https://placeholder.com/400'}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                  />
              </div>
              <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product?.name}</h1>
                <p className="text-xl text-blue-600 font-semibold mb-4">
                  ${product?.price?.toFixed(2)}
                </p>
                <div className="border-t border-b border-gray-200 py-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {product?.description}
                  </p>
                </div>
                
                <div className="md:w-1/2 p-8">
                <p className="text-gray-600 mb-4">
                  Seller: <Link to={`/seller/${product?.seller?._id}`} className="text-blue-600 hover:text-blue-800 underline">
                    {product?.seller?.name}
                  </Link>
                </p>
                </div>

                {/* <button
                  onClick={() => console.log('Add to cart:', product   )}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Add to Cart
                </button> */}

<button
                    onClick={(e) => handleAddToCart(e, product._id)}
                    disabled={isInCart}
                    className={`w-full ${
                        isInCart 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                    } text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center justify-center`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
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
      </>
      );
}

export default ProductDetail;
