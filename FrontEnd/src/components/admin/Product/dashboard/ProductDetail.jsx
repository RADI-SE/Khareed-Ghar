import React, { useState } from "react";
import defaultImage from "../../../../assets/images/default.jpeg";

const ProductDetail = ({ selectedProduct }) => {
  const [mainImage, setMainImage] = useState(selectedProduct?.images || defaultImage);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Image Gallery */}
        <div className="md:w-1/2">
          <div className="sticky top-4">
            {/* Main Image */}
            <div className="mb-4">
              <img
                src={`../../../../../public/images/${mainImage}` || defaultImage}
                alt={selectedProduct?.name || "Product"}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              <img
                src={`../../../../../public/images/${selectedProduct?.images}` || defaultImage}
                alt={selectedProduct?.name || "Product"}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => setMainImage(selectedProduct?.images)}
              />
              {/* Add more thumbnails here if you have multiple images */}
            </div>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedProduct?.name || "No Name Available"}
          </h1>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              ${selectedProduct?.price || "N/A"}
            </h3>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600">
              {selectedProduct?.description || "No description available."}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Specifications</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="font-medium text-gray-700 w-24">Capacity:</span>
                <span className="text-gray-600">{selectedProduct?.specifications.capacity || "N/A"}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium text-gray-700 w-24">Color:</span>
                <span className="text-gray-600">{selectedProduct?.specifications.color || "N/A"}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium text-gray-700 w-24">Condition:</span>
                <span className="text-gray-600">{selectedProduct?.specifications.condition || "N/A"}</span>
              </li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Seller Information</h3>
            <p className="text-gray-600">
              {selectedProduct?.seller.name || "No seller information available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
