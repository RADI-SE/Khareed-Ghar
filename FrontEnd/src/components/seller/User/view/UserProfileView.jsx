import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import { useProfileData } from "../../../../hooks/Users/useUserProfile";
import "../style.css";

const UserProfileView = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem("token");

  const {
    mutate: fetchUserProfile,
    isLoading,
    isError,
    error,
    data: userData,
  } = useProfileData(token);

  useEffect(() => {
    if (id) {
      fetchUserProfile(id);
    }
  }, [id, fetchUserProfile]);
  if (isError) {
    return (
      <Alert variant="danger" className="text-center">
        {error?.message || "An error occurred while fetching user data."}
      </Alert>
    );
  }
  if (!userData) {
    return <div></div>;
  }

  // Destructure userData for readability
  const { name, email, role, createdAt, lastLogin, status, orders } = userData;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{name || "Unknown"}'s Profile</h2>
        </div>
        <div className="card-body">
          {/* User Information */}
          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Email:</h5>
              <p className="text-muted">{email || "No email provided"}</p>
            </div>
            <div className="col-md-6">
              <h5>Role:</h5>
              <span
                className={`badge bg-${
                  role
                    ? role === "admin"
                      ? "primary"
                      : role === "seller"
                      ? "warning"
                      : "success"
                    : "secondary"
                }`}
              >
                {role
                  ? role.charAt(0).toUpperCase() + role.slice(1)
                  : "No Role Assigned"}
              </span>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Date Joined:</h5>
              <p className="text-muted">
                {createdAt
                  ? new Date(createdAt).toLocaleDateString()
                  : "Date not available"}
              </p>
            </div>
            <div className="col-md-6">
              <h5>Last Login:</h5>
              <p className="text-muted">
                {lastLogin
                  ? new Date(lastLogin).toLocaleString()
                  : "Last login not available"}
              </p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Status:</h5>
              <p>{status ? "Active" : "Inactive"}</p>
            </div>
            <div className="col-md-6">
              <h5>Orders:</h5>
              <p>{Array.isArray(orders) ? orders.length : 0} Orders</p>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
