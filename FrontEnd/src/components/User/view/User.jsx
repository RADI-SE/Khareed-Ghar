import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEdit, FaBan } from "react-icons/fa";
import EditUserModal  from "../edit/edit";
import { useFetchUsers } from "../../../hooks/Users/useFetchUsers";
import { useBanUsers } from "../../../hooks/Users/useActionUsers";
import { getStatusBadgeClass, handleBanToggle, handleSearch } from "../utils/utils";
import AlertMessage from "../../common/AlertMessage";
import LoadingSpinner from "../../Common/LoadingSpinner";

const User = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const token = sessionStorage.getItem("token");
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useFetchUsers(token, role);
  const { mutate: banUser } = useBanUsers(token);

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

  const filteredData = data;

  if (error) {
    return error && <AlertMessage variant="danger" message={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }
  return (
    <>
      <div>
        {filteredData?.length === 0 ? (
          <p>No {role.charAt(0).toUpperCase() + role.slice(1)} available</p>
        ) : (
          <div className="container mt-4">
            <h2 className="mb-3">
              {role.charAt(0).toUpperCase() + role.slice(1)} Data
            </h2>

            <div className="search-container mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => handleSearch(e, setSearchTerm)}
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
                            onClick={() =>
                              handleBanToggle(
                                banUser,
                                queryClient,
                                refetch,
                                _id,
                                role
                              )
                            }
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
    </>
  );
};

export default User;
