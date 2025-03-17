import React, { useState } from "react";
import DetailedProductView from "./dashboard/view";
function ProductManagement() {
  return (
    <div className="">
      <nav className="bg-blue-950 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Title and Search */}
            <div className="flex items-center space-x-4">
              <h1 className="text-white text-xl font-semibold">Product Management</h1>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 rounded-lg bg-blue-900 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="view-container mt-4">
        <DetailedProductView />
      </div>
    </div>
  );
}
export default ProductManagement;
