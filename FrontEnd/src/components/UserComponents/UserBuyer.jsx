import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEdit, FaBan } from "react-icons/fa";
import EditUserModal from "./EditUser";
import { useAdminService } from "../../services/admin/manageUsers";

const UserBuyer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const token = sessionStorage.getItem("token");
  const { displayUser, banUsers } = useAdminService();
  const role = "buyer";
  const queryClient = useQueryClient();

  const getBuyers = async () => {
    try {
      const buyers = await displayUser(token, role);
      return buyers || []; // Ensure empty array if no sellers are returned
    } catch (err) {
      throw new Error("Error fetching buyers: " + err.message);
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["buyer"],
    queryFn: getBuyers,
  });

  const getStatusBadgeClass = (role) => {
    const badgeClasses = {
      admin: "bg-primary",
      seller: "bg-success",
      moderator: "bg-warning",
      banned: "bg-danger",
    };
    return badgeClasses[role] || "bg-secondary";
  };

  const handleBanToggle = async (id, currentStatus) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${
        currentStatus === "banned" ? "unban" : "ban"
      } this user?`
    );
    if (!confirmAction) return;

    const updatedBuyer = data.map((user) =>
      user._id === id
        ? { ...user, role: currentStatus === "banned" ? "buyer" : "banned" }
        : user
    );

    queryClient.setQueryData(["buyer"], updatedBuyer);
    try {
      const response = await banUsers(
        token,
        id,
        currentStatus === "banned" ? "buyer" : "banned"
      );
      if (response) {
        refetch();
        if (response.isBanned) {
          alert("User banned successfully!");
        }
        if (!response.isBanned) {
          alert("User unbanned successfully!");
        }
      }
    } catch (err) {
      console.error("Error updating user status:", err);
      alert("Failed to update user status. Please try again later.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setShowEditModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setSelectedUserId(null);
  };

  const handleUserUpdated = (updatedUser) => {
    refetch();
    handleModalClose();
  };

  const filteredData = data?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error.message}</div>;
  }

  return (
    <div>
      {filteredData?.length === 0 ? (
        <p>No Buyers available</p>
      ) : (
        <div className="container mt-4">
          <h2 className="mb-3">Buyers Data</h2>

          <div className="search-container mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>First-Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Date of Joining</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((user) => {
                  const { _id, name, email, role, lastLogin } = user;
                  return (
                    <tr key={_id}>
                      <td>{_id}</td>
                      <td>
                        <Link
                          to={`/admin/users/user/${_id}`}
                          className="text-dark"
                        >
                          {name}
                        </Link>
                      </td>
                      <td>{email}</td>
                      <td>
                        <span
                          className={`badge ${getStatusBadgeClass(role)}`}
                          style={
                            role === "buyer"
                              ? { color: "#fff", backgroundColor: "#1A2B49" }
                              : {}
                          }
                        >
                          {role}
                        </span>
                      </td>
                      <td>{lastLogin}</td>
                      <td>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => handleEditClick(_id)}
                        >
                          <FaEdit className="me-2" /> Edit
                        </button>
                        <button
                          className={`btn ${
                            role === "banned" ? "btn-success" : "btn-danger"
                          } me-2`}
                          onClick={() => handleBanToggle(_id, role)}
                        >
                          <FaBan className="me-2" />
                          {role === "banned" ? "Unban" : "Ban"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {selectedUserId && (
            <EditUserModal
              userId={selectedUserId}
              show={showEditModal}
              handleClose={handleModalClose}
              onUserUpdated={handleUserUpdated}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserBuyer;
