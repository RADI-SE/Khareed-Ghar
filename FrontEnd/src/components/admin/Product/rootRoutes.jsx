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
