import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert, Button } from 'react-bootstrap';  
import { useAdminService } from "../../services/admin/manageUsers";
import "./user.css"
const UserProfileView = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const { displayUserProfile } = useAdminService();
  const token = sessionStorage.getItem("token");

  const displayUserProfileData = async () => {
    if (id) {
      try {
        setLoading(true);  
        const userData = await displayUserProfile(token, id);  
        console.log("User Profile Data:", userData);  
        setUser(userData);  
        setLoading(false);  
      } catch (err) {
        setError("Error fetching user profile: " + err.message);  
        setLoading(false);  
        console.error("Error fetching user profile:", err);
      }
    }
  };

  useEffect(() => {
    if (id) {
      displayUserProfileData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <Spinner animation="border" variant="primary" /> {/* Spinner while loading */}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  if (!user) {
    return (
      <Alert variant="warning" className="text-center">
        User data not found.
      </Alert>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{user.name ? user.name : 'Unknown'}'s Profile</h2>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Email:</h5>
              <p className="text-muted">{user.email ? user.email : 'No email provided'}</p>
            </div>
            <div className="col-md-6">
              <h5>Role:</h5>
              <span className={`badge bg-${user.role ? (user.role === 'admin' ? 'primary' : user.role === 'seller' ? 'warning' : 'success') : 'secondary'}`}>
                {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'No Role Assigned'}
              </span>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Date Joined:</h5>
              <p className="text-muted">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Date not available'}</p>
            </div>
            <div className="col-md-6">
              <h5>Last Login:</h5>
              <p className="text-muted">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Last login not available'}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Status:</h5>
              <p>{user.status ? 'Active' : 'Inactive'}</p>
            </div>
            <div className="col-md-6">
              <h5>Orders:</h5>
              <p>{user.orders && Array.isArray(user.orders) ? user.orders.length : 0} Orders</p>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
