import React, { useState, useEffect } from "react";
import "../style.css";
import { useCreateProduct } from "../../../../hooks/seller/useCreateProduct";
import { useFetchCategories } from "../../../../hooks/Categories/useFetchCategories";
import { useSellerService } from "../../../../services/seller/sellerServices";

export const AddProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [specifications, setSpecifications] = useState({
    condition: "",
    color: "",
    capacity: "",
  });
  const [price, setPrice] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [SubCategoryId, setSubCategoryId] = useState("");
  const [images, setImages] = useState([]);

  const token = sessionStorage.getItem("token");
  const seller = sessionStorage.getItem("id");
  const { data: parentCategories = [] } = useFetchCategories(token);

  const { mutate: createProduct, isLoading } = useCreateProduct(token);

  const { Error, setError, clearError, isError } = useSellerService();
  useEffect(() => {
    if (isError) {
      setError(Error);
      const timer = setTimeout(() => clearError(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isError, Error, setError, clearError]);

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
    setImages([...e.target.files]);
  };

const handleResetChange = (e) => {
  if (e && e.preventDefault) {
    e.preventDefault(); // Prevent default behavior if the function is triggered by a form
  }

  // Reset all fields to their default values
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
  setImages([]); // Reset images to an empty array
};

  const handleSubmit = (e) => {
    e.preventDefault();

    createProduct({
      token,
      name,
      description,
      specifications,
      price,
      category: CategoryId,
      subcategory: SubCategoryId,
      seller,
    });
  };

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit}>
        <h3>Add Product</h3>

        <div className="form-group">
          <label>Select Category</label>
          <select value={CategoryId} onChange={handleCategoryChange}>
            <option value="">Select parent category</option>
            {parentCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {CategoryId && (
          <div className="form-group">
            <label>Select Subcategory</label>
            <select value={SubCategoryId} onChange={handleSubCategoryChange}>
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
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
              />
            </div>

            <div className="form-group">
              <h4>Specifications</h4>
              <label>Condition</label>
              <select
                name="condition"
                value={specifications.condition}
                onChange={handleSpecificationsChange}
              
              >
                <option value="" disabled>
                  Select condition
                </option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>

              <label>Color</label>
              <select
                name="color"
                value={specifications.color}
                onChange={handleSpecificationsChange}
              >
                <option value="" disabled>
                  Select color
                </option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
              </select>

              <label>Capacity</label>
              <select
                name="capacity"
                value={specifications.capacity}
                onChange={handleSpecificationsChange}
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

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
              />
            </div>
            <div className="form-group">
              <label>Product Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </>
        )}

        {Error && <div className="alert alert-danger">{Error}</div>}
        <div className="form-btns">

        {SubCategoryId && (
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Submit"}
          </button>
        )}
          {SubCategoryId && (
          <button  onClick={handleResetChange} type="btn" disabled={isLoading}>
            {isLoading ? "Adding..." : "Reset"}
          </button>
        )}
        </div>
      </form>
    </div>
  );
};
