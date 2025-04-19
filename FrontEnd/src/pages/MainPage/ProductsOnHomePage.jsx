// import React from "react";
// import ProductCard from "../../components/Common/ProductCard";
// import { useFetchProducts } from "../../hooks/seller/useFetchProducts";

// const ProductsOnHomePage = () => {
//   const {
//     data: products = [],
//     isLoading: isLoadingProducts,
//     isError: productsError,
//   } = useFetchProducts();

//   if (isLoadingProducts) {
//     return <p>Loading...</p>;
//   }
//   if (productsError) {
//     return <p>Error fetching products. Please try again later.</p>;
//   }
//   return (
//     <>
//       <div className="container mx-auto py-12">
//         <h2 className="mx-2xl font-bold mb-6 text-center ">
//           Best Mobile Deals!
//         </h2>
//         <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-2">
//           {products.map((product) => (
//             <ProductCard product={product} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductsOnHomePage;

import React, { useRef } from "react";
import ProductCard from "../../components/Common/ProductCard";
import { useFetchProducts } from "../../hooks/seller/useFetchProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductsOnHomePage = () => {
  const {
    data: products = [],
    isLoading: isLoadingProducts,
    isError: productsError,
  } = useFetchProducts();

  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  if (isLoadingProducts) {
    return <p>Loading...</p>;
  }

  if (productsError) {
    return <p>Error fetching products. Please try again later.</p>;
  }

  return (
    <div className="container mx-auto py-12 relative">
      <h2 className="text-2xl font-bold mb-6 text-center">Best Mobile Deals!</h2>

      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronLeft />
      </button>

      {/* Scrollable Product Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide px-4"
      >
        {products.map((product) => (
          <div key={product._id} className="min-w-[200px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ProductsOnHomePage;

