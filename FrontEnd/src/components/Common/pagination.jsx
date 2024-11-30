import React, { useState } from "react";

const Pagination = ({ totalItems, rowsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="pagination-page">
      <button
        className="btn-page btn-secondary"
        onClick={handlePrevious}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      <span>
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        className="btn-page btn-secondary"
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
