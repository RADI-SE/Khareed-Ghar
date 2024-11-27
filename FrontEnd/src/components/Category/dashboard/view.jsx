import React, { useState } from "react";
import { useFetchCategories } from "../../../hooks/Categories/useFetchCategories";
import CategoryTable from "../../Common/category/parent-category"; 
import SubcategoryTable from "../../Common/category/sub-category"; 

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
  
  if (categoriesError) {
    return <div>Error fetching categories: {categoriesError.message}</div>;
  }

  return (
    <div className="table-responsive">
      {selectedCategory ? (
        <div>
          <h4>Subcategories of {selectedCategory.name}</h4>
          {selectedCategory.subcategories && selectedCategory.subcategories.length > 0 ? (
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
          <h4>Categories</h4>
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
