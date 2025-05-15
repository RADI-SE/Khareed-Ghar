import React, { useState } from "react";
import { useFetchCategories } from "../../../../hooks/Categories/useFetchCategories";
import CategoryTable from "../../../Common/category/parent-category";
import SubcategoryTable from "../../../Common/category/sub-category";
import { useAdminService } from "../../../../services/adminServices";

const DetailedProductView = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const token = sessionStorage.getItem("token");
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: categoriesError,
  } = useFetchCategories(token);
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  if (isLoadingCategories) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {selectedCategory ? (
        <div>
          <p className="text-lg mt-3 font-semibold text-[#10C8B8]">Subcategories of {selectedCategory.name}</p>
          {selectedCategory.subcategories &&
          selectedCategory.subcategories.length > 0 ? (
            <SubcategoryTable
              subcategories={selectedCategory.subcategories}
              selectedCategory={selectedCategory}
              onBackClick={handleBackClick}
            />
          ) : (
            <div>No subcategories available for {selectedCategory.name}</div>
          )}
        </div>
      ) : (
        <div>
          {/* Categories */}
          <CategoryTable
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
        </div>
      )}
    </div>
  );
};

export default DetailedProductView;
