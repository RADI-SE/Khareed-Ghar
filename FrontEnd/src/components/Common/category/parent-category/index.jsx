import React, { useState } from "react";
import Pagination from "../../pagination";

const CategoryTable = ({ categories, onCategoryClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const rowsPerPage = 5;

  // Filter by name
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = currentPage * rowsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-3 mt-2 table-responsive w-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Parent Categories</h3>
        <input
          type="text"
          placeholder="Search by name..."
          className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-[#10C8B8]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0); // Reset to first page on search
          }}
        />
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-md text-white uppercase bg-[#10C8B8]">
          <tr>
            <th className="px-6 py-3">Parent Category</th>
            <th className="px-6 py-3">Subcategories Count</th>
            <th className="px-6 py-3">Created Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCategories.length > 0 ? (
            paginatedCategories.map((category) => (
              <tr className="px-6 py-2" key={category._id}>
                <td className="px-6 py-2">
                  <button className="btn" onClick={() => onCategoryClick(category)}>
                    {category.name}
                  </button>
                </td>
                <td className="px-6 py-2">{category.subcategories?.length || 0}</td>
                <td className="px-6 py-2">{new Date(category.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-400">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        totalItems={filteredCategories.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CategoryTable;
