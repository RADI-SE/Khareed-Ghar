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
    setSelectedCategoryId(categoryId);
    navigate(`/collection/${categoryId}`);
  };
 
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedCategoryId(null);
    }
  }, [location.pathname]);

  return (
    <> 
      <div className="flex items-center space-x-4 py-4 px-2 bg-gray-100">
        {/* Scroll Left */}
        <button
          onClick={() => handleScroll("left")}
          className="p-2 bg-gray-500 text-black font-bold rounded shadow-md text-lg"
        >
          ←
        </button>
 
        <div
          ref={scrollContainerRef}
          className="flex items-center space-x-4 overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 text-center min-w-[80px]"
            >
              <div className="text-2xl cursor-pointer">{category.icon}</div>
              <div
                className="text-sm text-gray-700 cursor-pointer"
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.name}
              </div>
            </div>
          ))}
        </div>
 
        <button
          onClick={() => handleScroll("right")}
          className="p-2 bg-gray-500 text-black font-bold rounded shadow-md text-lg"
        >
          →
        </button>
      </div>
      {selectedCategoryId && (
        <AllCategoryProducts selectedCategory={selectedCategoryId} />
      )}
    </>
  );
};

export default CategoryBar;
