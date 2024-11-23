import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { useAdminService } from "../../services/admin/manageUsers";

const BannndUser = ({ userId, onUserUpdated, show, handleClose }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { banUsers, displayUserProfile } = useAdminService();
  const token = sessionStorage.getItem("token");

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (userId) {
      try {
        setLoading(true);
        const fetchedUser = await displayUserProfile(token, userId);
        setUser(fetchedUser);
        setError("");
      } catch (err) {
        setError("Error fetching user profile: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Effect to load user data when `userId` or `show` changes
  useEffect(() => {
    if (userId && show) {
      fetchUserProfile();
    }
  }, [userId, show]);

  // Handle ban/unban action
  const handleBanToggle = async () => {
    if (!user) return;

    const confirmAction = window.confirm(
      `Are you sure you want to ${
        user.isBanned ? "unban" : "ban"
      } this user?`
    );
    if (!confirmAction) return;

    try {
      setLoading(true);
      const response = await banUsers(token, userId, user.isBanned ? "active" : "banned");

      if (response.status === 200) {
        const updatedUser = {
          ...user,
          isBanned: !user.isBanned,
          role: user.isBanned ? user.originalRole : "banned",
        };

        setUser(updatedUser); // Update the local user state
        onUserUpdated(updatedUser); // Notify the parent about the updated user
        setSuccessMessage(
          `User has been successfully ${
            user.isBanned ? "unbanned" : "banned"
          }.`
        );
      }
    } catch (err) {
      setError("Error updating user status: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading...</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ban/Unban User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {user && (
          <>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Current Status:</strong>{" "}
              {user.isBanned ? "Banned" : "Active"}
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={user?.isBanned ? "success" : "danger"}
          onClick={handleBanToggle}
        >
          {user?.isBanned ? "Unban User" : "Ban User"}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BannndUser;
