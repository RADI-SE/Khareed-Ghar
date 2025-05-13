import React from "react";

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
    <div className="h-20 p-3 flex flex-wrap items-center justify-between">
      <button
        className="text-white bg-[#10C8B8] hover:bg-[#0eb2a6] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-20 px-1 py-2.5 me-2 mb-2"
        onClick={handlePrevious}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      <span>
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        className="text-white bg-[#10C8B8] hover:bg-[#0eb2a6] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-20 px-1 py-2.5 me-2 mb-2"
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
