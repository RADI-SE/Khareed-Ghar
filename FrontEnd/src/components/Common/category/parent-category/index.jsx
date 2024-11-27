import React from "react";

const CategoryTable = ({ categories, onCategoryClick }) => {
  return (
    <div>
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
    </div>
  );
};

export default CategoryTable;
