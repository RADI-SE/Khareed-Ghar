import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const RegionForm = ({ region: region = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    state: region.state || "",
    city: region.city || "",
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
      {/* State Input */}
      <Form.Group className="mb-3">
        <Form.Label>State Name</Form.Label>
        <Form.Control
          type="text"
          name="state"
          value={formData.state}  
          onChange={handleChange}
          placeholder="Enter State Name"
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

      {/* Save Button */}
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};
