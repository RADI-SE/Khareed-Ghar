import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaBan } from "react-icons/fa";
import EditUserModal from "./EditUser";
import { useAdminService } from "../../services/admin/manageUsers";

const UserBuyer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("token");
  const { displayUser, banUsers } = useAdminService();
  const role = "buyer";

  useEffect(() => {
    if (token && role) {
      getSellers();
    }
  }, [token, role]);

  const getSellers = async () => {
    try {
      setLoading(true);
      const sellers = await displayUser(token, role);
      setData(sellers);
      setFilteredData(sellers);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Error fetching sellers: " + err.message);
      console.error("Error fetching sellers:", err);
    }
  };

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
  
    try {
      const response = await banUsers(token, id, "banned");
      if (response.status === 200) {
        alert("User status updated successfully!");
        // Update local state without fetching data again
        setData((prevData) =>
          prevData.map((user) =>
            user._id === id
              ? { ...user, role: currentStatus === "banned" ? "seller" : "banned" }
              : user
          )
        );
  
        setFilteredData((prevFilteredData) =>
          prevFilteredData.map((user) =>
            user._id === id
              ? { ...user, role: currentStatus === "banned" ? "seller" : "banned" }
              : user
          )
        );
      }
    } catch (err) {
      console.error("Error updating user status:", err);
      alert("Failed to update user status. Please try again later.");
    }
  };
  

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
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
    setData((prevData) =>
      prevData.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    handleModalClose();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {filteredData.length === 0 ? (
        <p>No Buyer available</p>
      ) : (
        <div className="container mt-4">
          <h2 className="mb-3">Buyer Data</h2>
          
          <div className="search-container mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Table */}
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
                {filteredData.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>
                      <Link
                        to={`/admin/users/user/${user._id}`}
                        className="text-dark"
                      >
                        {user.name}
                      </Link>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge ${getStatusBadgeClass(user.role)}`}
                        style={
                          user.role === "seller"
                            ? { color: "#fff", backgroundColor: "#1A2B49" }
                            : {}
                        }
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleEditClick(user._id)}
                      >
                        <FaEdit className="me-2" /> Edit
                      </button>
                      <button
                        className={`btn ${
                          user.role === "banned"
                            ? "btn-success"
                            : "btn-danger"
                        } me-2`}
                        onClick={() => handleBanToggle(user._id, user.role)}
                      >
                        <FaBan className="me-2" />{" "}
                        {user.role === "banned" ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))}
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
