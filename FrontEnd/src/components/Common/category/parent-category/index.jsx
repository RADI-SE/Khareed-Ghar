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
    <div className="p-3 mt-2 table-responsive w-100">
      <h3>Parent Categories</h3>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-md text-white uppercase bg-[#10C8B8]">
          <tr>
            <th className="px-6 py-3">Parent Category</th>
            <th className="px-6 py-3">Subcategories Count</th>
            <th className="px-6 py-3">Created Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCategories.map((category) => (
            <tr className="px-6 py-2" key={category._id}>
              <td className="px-6 py-2">
                <button className="btn" onClick={() => onCategoryClick(category)}>
                  {category.name}
                </button>
              </td>
              <td className="px-6 py-2">{category.subcategories?.length || 0}</td>
              <td className="px-6 py-2">{new Date(category.createdAt).toLocaleDateString()}</td>
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
    </div>
  );
};

export default CategoryTable;
