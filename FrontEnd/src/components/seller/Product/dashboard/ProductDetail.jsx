import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import defaultImage from "../../../../assets/images/default.jpeg";
import { useSellerService } from "../../../../services/seller/sellerServices";
import FeedbackTable from "../../../Common/Feedback/FeedbackTable";

const ProductDetail = ({ selectedProduct }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { getFeedbackByProductId } = useSellerService();
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const productImages = selectedProduct?.images 
    ? Array.isArray(selectedProduct.images) 
      ? selectedProduct.images 
      : [selectedProduct.images]
    : [defaultImage]; 

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (selectedProduct?._id) {
        setIsLoading(true);
        try {
          const response = await getFeedbackByProductId(selectedProduct._id);
          setFeedbacks(response || []);
        } catch (error) {
          console.error("Error fetching feedbacks:", error);
          setFeedbacks([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchFeedbacks();
  }, [selectedProduct?._id, getFeedbackByProductId]);

  return (
    <>
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square w-full relative rounded-lg overflow-hidden bg-gray-100">
            <img
              src={productImages[selectedImageIndex] ? `../../../../../public/images/${productImages[selectedImageIndex]}` : defaultImage}
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
                    ? "ring-2 ring-[#10C8B8]"
                    : "ring-1 ring-gray-200"
                }`}
              >
                <img
                  src={image ? `../../../../../public/images/${image}` : defaultImage}
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
                {selectedProduct?.specifications?.capacity || "N/A"}
              </li>
              <li className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Color:</span>
                {selectedProduct?.specifications?.color || "N/A"}
              </li>
              <li className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Condition:</span>
                {selectedProduct?.specifications?.condition || "N/A"}
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-[#10C8B8]">
                ${selectedProduct?.price || "N/A"}
              </h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">
                Seller: <span className="text-gray-600">{selectedProduct?.seller?.name || "My Product"}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* Feedback Section */}
        {feedbacks.length > 0 && (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Feedbacks</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <FeedbackTable feedbacks={feedbacks} />
        )}
      </div>
        )}

    </>
  );
};

ProductDetail.propTypes = {
  selectedProduct: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    specifications: PropTypes.shape({
      capacity: PropTypes.string,
      color: PropTypes.string,
      condition: PropTypes.string
    }),
    seller: PropTypes.shape({
      name: PropTypes.string
    })
  })
};

export default ProductDetail;
