import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { useAdminService } from "../../services/admin/manageUsers";

const EditUserModal = ({ userId, show, handleClose, onUserUpdated }) => {
  const [user, setUser] = useState({ name: "", email: "", role: "" }); // Fix: Properly handle user state
  const [loading, setLoading] = useState(false); // Adjusted loading state initialization
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { editUserProfile, displayUserProfile } = useAdminService();
  const token = sessionStorage.getItem("token");

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (userId) {
      try {
        setLoading(true);
        const fetchedUser = await displayUserProfile(token, userId);
        setUser(fetchedUser); // Correctly set the fetched user data
      } catch (err) {
        setError("Error fetching user profile: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Effect to load user data when `userId` changes
  useEffect(() => {
    if (userId && show) {
      fetchUserProfile();
    }
  }, [userId, show]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      setLoading(true);
      await editUserProfile(token, userId, user);
      setSuccessMessage("User updated successfully!");
      fetchUserProfile();
      onUserUpdated(user); // Notify parent of successful update
      setTimeout(() => {
        handleClose(); // Close modal after success
        setSuccessMessage(""); // Reset success message
      }, 1500);
    } catch (err) {
      setError("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={user.role} onChange={handleChange} required>
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                  <option value="moderator">Moderator</option>
                  <option value="banned">Banned</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
