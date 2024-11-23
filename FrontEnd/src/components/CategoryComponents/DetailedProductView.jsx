import React, { useEffect, useState } from "react";
import "./productstyle.css";
import { FaArrowLeft } from "react-icons/fa"; // Importing the arrow icon from React Icons

import { useAdminService } from "../../services/adminServices";

const DetailedProductView = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected parent category
  const token = sessionStorage.getItem("token");
  const { displayCategories } = useAdminService();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await displayCategories(token);
      console.log(fetchCategories)
      setCategories(fetchedCategories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

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
              {selectedCategory.subcategories.map((subcategory) => (
                <tr key={subcategory._id}>
                  <td>{subcategory.name}</td>
                  <td>
                    {new Date(subcategory.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
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
                  <td>{category.subcategories.length}</td>
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
