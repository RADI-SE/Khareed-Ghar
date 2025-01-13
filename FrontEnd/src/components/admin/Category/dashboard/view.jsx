import React, { useState, useEffect } from "react";
import { useFetchCategories } from "../../../../hooks/Categories/useFetchCategories";
import CategoryTable from "../../../Common/category/parent-category";
import SubcategoryTable from "../../../Common/category/sub-category";
import { useAdminService } from "../../../../services/adminServices";
const DetailedProductView = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const token = sessionStorage.getItem("token");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: categoriesError,
    isFetched: categoriesSuccess,
  } = useFetchCategories(token);

  useEffect(() => {
    if (categoriesSuccess) {
      setShowSuccessMessage(true); 
      setShowErrorMessage(false); 
      const timer = setTimeout(() => {
        setShowSuccessMessage(false); 
      }, 2000); 
   
      return () => clearTimeout(timer);
    }
  }, [categoriesSuccess]);


  useEffect(() => {
    if (categoriesError) {
      setShowErrorMessage(true);
      setShowSuccessMessage(false);  
      const timer = setTimeout(() => {
        setShowErrorMessage(false); 
      }, 2000); 
   
      return () => clearTimeout(timer);
    }
  }, [categoriesSuccess]);

  
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
      {showSuccessMessage && (
        <p className="alert alert-success">Categories fetched successfully</p>
      )}
       {showErrorMessage && (
        <p className="alert alert-danger"> Error fetching categories</p>
      )}
      {selectedCategory ? (
        <div>
          <h4>Subcategories of {selectedCategory.name}</h4>
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
