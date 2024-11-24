import React, { useState } from "react";
import "./productstyle.css";
import { FaArrowLeft } from "react-icons/fa"; 
import { useQuery } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";

const DetailedProductView = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const token = sessionStorage.getItem("token");
  const { displayCategories, getSubCategories } = useAdminService();
 
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => displayCategories(token),
  });

  const {
    data: subcategories = [],
    isLoading: isLoadingSubcategories,
    error: subcategoriesError,
    refetch, 
  } = useQuery({
    queryKey: ["subcategories", selectedCategory?._id],
    queryFn: () => getSubCategories(token, selectedCategory._id),
    enabled: !!selectedCategory, 
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    refetch(); 
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  if (isLoadingCategories) return <div>Loading categories...</div>;
  if (categoriesError)
    return <div>Error fetching categories: {categoriesError.message}</div>;

  if (selectedCategory && isLoadingSubcategories)
    return <div>Loading subcategories...</div>;
  if (selectedCategory && subcategoriesError)
    return <div>Error fetching subcategories: {subcategoriesError.message}</div>;

  return (
    <div className="table-responsive">
      {selectedCategory ? (
        <>
          <div className="tablecss">
            <button className="arrow-left btn-light" onClick={handleBackClick}>
              <FaArrowLeft />
            </button>
            <h4>Subcategories of {selectedCategory.name}</h4>
          </div>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Subcategory Name</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(subcategories) ? (
                subcategories.map((subcategory) => (
                  <tr key={subcategory._id}>
                    <td>{subcategory.name}</td>
                    <td>{new Date(subcategory.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No subcategories available</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h4>Parent Categories</h4>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Parent Category</th>
                <th>Subcategories Count</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.name}
                    </button>
                  </td>
                  <td>{category.subcategories?.length || 0}</td>
                  <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DetailedProductView;
