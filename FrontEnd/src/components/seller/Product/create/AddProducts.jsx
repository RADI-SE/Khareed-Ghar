import React, { useState } from "react";
import "../style.css";
import { useCreateProduct } from "../../../../hooks/seller/useCreateProduct";
import { useFetchCategories } from "../../../../hooks/Categories/useFetchCategories";
import { useCreateAuction } from "../../../../hooks/seller/Auctions/useCreateAuction";
import { useSellerService } from "../../../../services/seller/sellerServices";

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
      alert("Please fill in all the required fields!");
      return false;
    } else {
      alert("Product added successfully!");
    }

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
    console.log("Created product ID:", productId);
    if (isAuction && productId) {
      createAuction({
        productId: productId,
        startingBid: auctionDetails.startingBid,
        startTime: auctionDetails.startTime,
        endTime: auctionDetails.endTime,
      });
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className=" place-items-center mt-10 pt-3 max-w-md mx-auto"
      >
        <h3>Add Product</h3>

        <div className="w-100 h-100 bg-gray-200 p-3 justify-evenly mb-2 rounded">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Category
          </label>
          <select
            value={CategoryId}
            onChange={handleCategoryChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <div className="w-100 h-100 bg-gray-200 p-3 justify-evenly mb-2 rounded">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Subcategory
            </label>
            <select
              value={SubCategoryId}
              onChange={handleSubCategoryChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div className="w-100 h-100 bg-gray-200 p-3 justify-evenly">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="w-100 h-100 bg-gray-200 p-3 justify-evenly">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="w-100 h-100 bg-gray-200 p-3 justify-evenly">
              <h4>Specifications</h4>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Condition
              </label>
              <select
                name="condition"
                value={specifications.condition}
                onChange={handleSpecificationsChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select condition
                </option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>

              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Color
              </label>
              <select
                name="color"
                value={specifications.color}
                onChange={handleSpecificationsChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select color
                </option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
              </select>

              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Capacity
              </label>
              <select
                name="capacity"
                value={specifications.capacity}
                onChange={handleSpecificationsChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select capacity
                </option>
                <option value="64GB">64GB</option>
                <option value="128GB">128GB</option>
                <option value="256GB">256GB</option>
                <option value="512GB">512GB</option>
              </select>
            </div>
            <div className="w-100 h-100 bg-gray-200 p-3 justify-evenly">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="w-100 h-100 bg-gray-200 p-3 justify-evenly">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Images
              </label>
              <form>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </form>

              <label className="block mb-2">Enable Auction?</label>
              <input
                type="checkbox"
                checked={isAuction}
                onChange={handleAuctionToggle}
                className="mb-4"
              />

              {isAuction && (
                <div className="bg-gray-100 p-3 rounded mb-4">
                  <label className="block mb-2">Starting Time</label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={auctionDetails.startTime}
                    onChange={handleAuctionDetailsChange}
                    className="border rounded p-2 w-full mb-2"
                  />

                  <label className="block mb-2">Ending Time</label>
                  <input
                    type="datetime-local"
                    name="endTime"
                    value={auctionDetails.endTime}
                    onChange={handleAuctionDetailsChange}
                    className="border rounded p-2 w-full mb-2"
                  />

                  <label className="block mb-2">Starting Bid</label>
                  <input
                    type="number"
                    name="startingBid"
                    value={auctionDetails.startingBid}
                    onChange={handleAuctionDetailsChange}
                    placeholder="Enter starting bid"
                    className="border rounded p-2 w-full"
                  />
                </div>
              )}
            </div>
          </>
        )}

        <div className="form-btns">
          <button type="submit">Submit</button>
          <button onClick={handleResetChange} type="btn">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
