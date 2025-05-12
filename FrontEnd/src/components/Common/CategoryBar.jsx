import React, { useState, useRef, useEffect } from "react";
import { useFetchCategories } from "../../hooks/Categories/useFetchCategories";
import { useLocation, useNavigate } from "react-router-dom";
import AllCategoryProducts from "./products";

const CategoryBar = () => {
  const scrollContainerRef = useRef(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const { data: categories = [] } = useFetchCategories();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      if (direction === "left") {
        scrollContainerRef.current.scrollLeft -= scrollAmount;
      } else if (direction === "right") {
        scrollContainerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const handleCategoryClick = (categoryId) => {
     navigate(`/collection/${categoryId}`);
     setSelectedCategoryId(categoryId);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedCategoryId(null);
    }
  }, [location.pathname]);


  return (
    <>
      <div className="relative bg-white shadow-md rounded-lg mx-4 my-6">
        <div className="flex items-center px-4 py-3">
          {/* Scroll Left Button */}
          <button
            onClick={() => handleScroll("left")}
            className="flex-none p-2 rounded-full bg-[#10C8B8] text-[#FFD700] hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 shadow-sm border border-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Categories Container */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex items-center space-x-6 overflow-x-auto scrollbar-hide px-4 scroll-smooth"
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex-none"
              >
                <button
                  onClick={() => handleCategoryClick(category._id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                    ${selectedCategoryId === category._id
                      ? 'bg-[#FFD700] text-white shadow-md transform scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => handleScroll("right")}
            className="flex-none p-2 rounded-full bg-[#10C8B8] text-[#FFD700] hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 shadow-sm border border-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {selectedCategoryId && (
        <AllCategoryProducts  />
      )}
    </>
  );
};

export default CategoryBar;
