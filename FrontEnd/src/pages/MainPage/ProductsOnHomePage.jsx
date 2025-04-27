import React, { useRef } from "react";
import ProductCard from "../../components/Common/ProductCard";
import { useFetchProducts } from "../../hooks/seller/useFetchProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductsOnHomePage = () => {
  const {
    data: products = [],
    isLoading: isLoadingProducts,
    isError: productsError,
  } = useFetchProducts();

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (product.category) {
      const categoryId = product.category._id;
      const categoryName = product.category.name;
      
      if (!acc[categoryId]) {
        acc[categoryId] = {
          name: categoryName,
          products: []
        };
      }
      acc[categoryId].products.push(product);
    }
    return acc;
  }, {});

  const scrollRefs = useRef({});
  const navigate = useNavigate();

  const scroll = (categoryId, direction) => {
    if (scrollRefs.current[categoryId]) {
      scrollRefs.current[categoryId].scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  if (isLoadingProducts) {
    return <p>Loading...</p>;
  }

  if (productsError) {
    return <p>Error fetching data. Please try again later.</p>;
  }

  // Debug logs
  console.log('Products:', products);
  console.log('Grouped Products:', productsByCategory);

  return (
    <div className="container mx-auto py-12">
      {Object.entries(productsByCategory)
        .filter(([_, categoryData]) => categoryData.products.length > 0)
        .map(([categoryId, categoryData]) => (
          <div key={categoryId} className="mb-12">
            <button 
              onClick={() => navigate(`/collection/${categoryId}`)} 
              className="md:text-2xl font-bold text-blue-900 hover:text-blue-700 text-2xl font-bold mb-6 text-center capitalize transition-colors">
              {categoryData.name}
            </button>
            <div className="relative">
              {/* Left Button */}
              <button
                onClick={() => scroll(categoryId, "left")}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 shadow p-2 rounded-full hover:bg-gray-200 border border-4 border-white"
              >
                <ChevronLeft />
              </button>

              <div
                ref={(el) => (scrollRefs.current[categoryId] = el)}
                className="flex overflow-x-auto space-x-4 scrollbar-hide px-4"
              >
                {categoryData.products.map((product) => (
                  <div
                    key={product._id}
                    className="min-w-[200px] flex-shrink-0 sm:min-w-[250px]"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Right Button */}
              <button
                onClick={() => scroll(categoryId, "right")}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 shadow p-2 rounded-full hover:bg-gray-200 border border-4 border-white"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductsOnHomePage;