import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const UserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    
    e.preventDefault();
    
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
 
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select name="role" value={formData.role} onChange={handleChange}>
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
          <option value="moderator">Moderator</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default UserForm;
