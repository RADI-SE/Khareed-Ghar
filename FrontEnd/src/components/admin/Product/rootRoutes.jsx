import React, { useState } from "react";
import DetailedProductView from "./dashboard/view";
function ProductManagement() {
  return (
    <div className="">
      <nav className="">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 bg-blue-950 rounded-lg">
        <input type="search" placeholder="search" className="search-input"/>
        </div>
      </nav>
      <div className="view-container mt-4">
        <DetailedProductView />
      </div>
    </div>
  );
}
export default ProductManagement;
