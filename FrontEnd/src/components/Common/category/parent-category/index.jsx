import React, { useState } from "react";
import Pagination from "../../pagination";

const CategoryTable = ({ categories, onCategoryClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;
  const startIndex = currentPage * rowsPerPage;
  const paginatedCategories = categories.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (  
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
          {paginatedCategories.map((category) => (
            <tr key={category._id}>
              <td>
                <button className="btn" onClick={() => onCategoryClick(category)}>
                  {category.name}
                </button>
              </td>
              <td>{category.subcategories?.length || 0}</td>
              <td>{new Date(category.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={categories.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CategoryTable;
