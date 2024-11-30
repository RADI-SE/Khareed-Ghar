import React from "react";
import { FaArrowLeft } from "react-icons/fa";
const SubcategoryTable = ({ subcategories, selectedCategory, onBackClick }) => {
    return (
      <div>
        <div className="tablecss">
          <button className="arrow-left btn-light" onClick={onBackClick}>
            <FaArrowLeft />
          </button>
         </div>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Subcategory Name</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(subcategories) && subcategories.length > 0 ? (
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
      </div>
    );
  };
  
  export default SubcategoryTable;