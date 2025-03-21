import React, { useState } from "react";
import "../style.css";
import { useCreateProduct } from "../../../../hooks/seller/useCreateProduct";
import { useFetchCategories } from "../../../../hooks/Categories/useFetchCategories";
import { useCreateAuction } from "../../../../hooks/seller/Auctions/useCreateAuction";
import { useSellerService } from "../../../../services/seller/sellerServices";
import toast, { Toaster } from 'react-hot-toast';

export const AddProductForm = () => {
  const [name, setName] = useState("");
  const { mutate: createAuction } = useCreateAuction();
  const [description, setDescription] = useState("");
  const { addProduct } = useSellerService();
  const [specifications, setSpecifications] = useState({
    condition: "",
    color: "",
    capacity: "",
  });
  const [price, setPrice] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [SubCategoryId, setSubCategoryId] = useState("");
  const [images, setImage] = useState([]);

  const [isAuction, setIsAuction] = useState(false);
  const [auctionDetails, setAuctionDetails] = useState({
    startTime: "",
    endTime: "",
    startingBid: "",
  });

  const token = sessionStorage.getItem("token");
  const seller = sessionStorage.getItem("id");
  const { data: parentCategories = [] } = useFetchCategories(token);

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setSubCategoryId("");
  };

  const handleSubCategoryChange = (e) => {
    setSubCategoryId(e.target.value);
  };

  const handleSpecificationsChange = (e) => {
    setSpecifications({
      ...specifications,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFiles = [...e.target.files];
    if (selectedFiles.length > 0) {
      setImage(selectedFiles); // Update image state with the selected files
    }
  };

  const handleResetChange = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    setName("");
    setDescription("");
    setSpecifications({
      condition: "",
      color: "",
      capacity: "",
    });
    setPrice("");
    setCategoryId("");
    setSubCategoryId("");
    setImage([]); // Reset images to an empty array
  };

  const handleAuctionToggle = (e) => {
    setIsAuction(e.target.checked);
  };

  const handleAuctionDetailsChange = (e) => {
    setAuctionDetails({
      ...auctionDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !price ||
      !CategoryId ||
      !SubCategoryId ||
      images.length === 0
    ) {
      return false;
    }

    try {
      const productId = await addProduct(
        token,
        name,
        description,
        specifications,
        price,
        CategoryId,
        SubCategoryId,
        seller,
        images
      );
      
      if (isAuction && productId) {
        await createAuction({
          productId: productId,
          startingBid: auctionDetails.startingBid,
          startTime: auctionDetails.startTime,
          endTime: auctionDetails.endTime,
        });
      }
      
      handleResetChange();
    } catch (error) {
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add New Product</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <select
              value={CategoryId}
              onChange={handleCategoryChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select parent category</option>
              {parentCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {CategoryId && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Subcategory
              </label>
              <select
                value={SubCategoryId}
                onChange={handleSubCategoryChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select subcategory</option>
                {parentCategories
                  .find((category) => category._id === CategoryId)
                  ?.subcategories.map((subCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {SubCategoryId && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter product description"
                  rows="4"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Specifications</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    name="condition"
                    value={specifications.condition}
                    onChange={handleSpecificationsChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="" disabled>Select condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <select
                    name="color"
                    value={specifications.color}
                    onChange={handleSpecificationsChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="" disabled>Select color</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity
                  </label>
                  <select
                    name="capacity"
                    value={specifications.capacity}
                    onChange={handleSpecificationsChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="" disabled>Select capacity</option>
                    <option value="64GB">64GB</option>
                    <option value="128GB">128GB</option>
                    <option value="256GB">256GB</option>
                    <option value="512GB">512GB</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter product price"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  accept="image/*"
                />

                <div className="flex items-center space-x-2 mt-4">
                  <label className="text-sm font-medium text-gray-700">Enable Auction?</label>
                  <input
                    type="checkbox"
                    checked={isAuction}
                    onChange={handleAuctionToggle}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>

                {isAuction && (
                  <div className="bg-gray-100 p-4 rounded-lg space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Starting Time
                      </label>
                      <input
                        type="datetime-local"
                        name="startTime"
                        value={auctionDetails.startTime}
                        onChange={handleAuctionDetailsChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ending Time
                      </label>
                      <input
                        type="datetime-local"
                        name="endTime"
                        value={auctionDetails.endTime}
                        onChange={handleAuctionDetailsChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Starting Bid
                      </label>
                      <input
                        type="number"
                        name="startingBid"
                        value={auctionDetails.startingBid}
                        onChange={handleAuctionDetailsChange}
                        placeholder="Enter starting bid"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleResetChange}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
