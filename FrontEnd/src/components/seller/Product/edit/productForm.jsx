import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const ProductForm = ({ product = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    specifications: product.specifications || {
      condition: "",
      color: "",
      capacity: "",
    },
    price: product.price || "",
    images: product.images || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSpecificationsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      specifications: { ...prevData.specifications, [name]: value },
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Condition</Form.Label>
        <Form.Select
          name="condition"
          value={formData.specifications.condition}
          onChange={handleSpecificationsChange}
          required
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
          value={formData.specifications.color}
          onChange={handleSpecificationsChange}
          required
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
          value={formData.specifications.capacity}
          onChange={handleSpecificationsChange}
          required
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
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter product price"
          required
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

      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};