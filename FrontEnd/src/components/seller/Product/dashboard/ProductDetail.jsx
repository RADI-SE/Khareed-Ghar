import React, { useState } from "react";
import defaultImage from "../../../../assets/images/default.jpeg";

const ProductDetail = ({ selectedProduct }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Convert single image to array if needed and handle empty cases
  const productImages = selectedProduct?.images 
    ? Array.isArray(selectedProduct.images) 
      ? selectedProduct.images 
      : [selectedProduct.images]
    : [defaultImage];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square w-full relative rounded-lg overflow-hidden bg-gray-100">
            <img
              src={`../../../../../public/images/${productImages[selectedImageIndex]}` || defaultImage}
              alt={`${selectedProduct?.name || "Product"} - View ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square relative rounded-lg overflow-hidden ${
                  selectedImageIndex === index
                    ? "ring-2 ring-blue-500"
                    : "ring-1 ring-gray-200"
                }`}
              >
                <img
                  src={`../../../../../public/images/${image}` || defaultImage}
                  alt={`${selectedProduct?.name || "Product"} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity duration-200"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {selectedProduct?.name || "No Name Available"}
          </h1>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600">
              {selectedProduct?.description || "No description available."}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Specifications</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Capacity:</span>
                {selectedProduct?.specifications.capacity || "N/A"}
              </li>
              <li className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Color:</span>
                {selectedProduct?.specifications.color || "N/A"}
              </li>
              <li className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Condition:</span>
                {selectedProduct?.specifications.condition || "N/A"}
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-green-600">
                ${selectedProduct?.price || "N/A"}
              </h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">
                Seller: <span className="text-gray-600">{selectedProduct?.seller.name || "No seller information available"}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
