import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const ProductForm = ({ product = {}, onSubmit }) => {
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(product.description || "");
  const [specifications, setSpecifications] = useState({
    condition: product?.specifications?.condition || "",
    color: product?.specifications?.color || "",
    capacity: product?.specifications?.capacity || "",
  });
  const [price, setPrice] = useState(product.price || "");
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "description") setDescription(value);
    if (name === "price") setPrice(value);
  };

  const handleSpecificationsChange = (e) => {
    const { name, value } = e.target;
    setSpecifications((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !price || images.length === 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      name,
      description,
      price,
      specifications,
      images,
    };

    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter product name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={description}
          onChange={handleChange}
          placeholder="Enter product description"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Condition</Form.Label>
        <Form.Select
          name="condition"
          value={specifications.condition}
          onChange={handleSpecificationsChange}
        >
          <option value="" disabled>Select condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Color</Form.Label>
        <Form.Select
          name="color"
          value={specifications.color}
          onChange={handleSpecificationsChange}
        >
          <option value="" disabled>Select color</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Capacity</Form.Label>
        <Form.Select
          name="capacity"
          value={specifications.capacity}
          onChange={handleSpecificationsChange}
        >
          <option value="" disabled>Select capacity</option>
          <option value="64GB">64GB</option>
          <option value="128GB">128GB</option>
          <option value="256GB">256GB</option>
          <option value="512GB">512GB</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
          placeholder="Enter product price"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Product Images</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={handleImageChange}
          accept="image/*"
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="bg-[#10C8B8] hover:bg-[#0eb2a6]">
        Save Changes
      </Button>
    </Form>
  );
};
