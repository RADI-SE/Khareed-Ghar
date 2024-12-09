import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const ZoonForm = ({ zoon = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    district: zoon.district || "",
    city: zoon.city || "",
  });

  // Handle field changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* District Input */}
      <Form.Group className="mb-3">
        <Form.Label>District Name</Form.Label>
        <Form.Control
          type="text"
          name="district"
          value={formData.district}  
          onChange={handleChange}
          placeholder="Enter District Name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City Name</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={formData.city} 
          onChange={handleChange}
          placeholder="Enter City Name"
          required
        />
      </Form.Group>

      {/* Submit Button */}
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};
