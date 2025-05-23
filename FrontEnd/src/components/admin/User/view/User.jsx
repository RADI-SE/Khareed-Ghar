import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEdit, FaBan } from "react-icons/fa";
import EditUserModal from "../edit/edit";
import { useFetchUsers } from "../../../../hooks/Users/useFetchUsers";
import { useBanUsers } from "../../../../hooks/Users/useActionUsers";
import { getStatusBadgeClass, handleBanToggle } from "../utils/utils";
import AlertMessage from "../../../common/AlertMessage";
import LoadingSpinner from "../../../Common/LoadingSpinner";

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

  // Filter the data based on the search term
  const filteredData = data?.filter((user) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTermLower) ||
      user.email.toLowerCase().includes(searchTermLower)
    );
  });

  if (error) {
    return error && <AlertMessage variant="danger" message={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  return (
    <>
      <div className="lg:grid lg:grid-cols-3">
        {filteredData?.length === 0 ? (
          <p>No {role.charAt(0).toUpperCase() + role.slice(1)} available</p>
        ) : (
          <div className="lg:col-span-3">
            <div>
              <h2>
                {role.charAt(0).toUpperCase() + role.slice(1)} Data
              </h2>

              <div>
                <input
                  type="text"
                  className="border p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                  placeholder="Search by name or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}  // Handle search term change
                />
              </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-white uppercase bg-[#10C8B8]">
                  <tr>
                    <th className="px-6 py-3">First-Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Last Login</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((user) => {
                    const { _id, id, name, email, role, lastLogin } = user;
                    return (
                      <tr key={_id} className="bg-white-500 border-b hover:bg-gray-300">
                        <td>
                          <Link to={`/admin/users/user/${_id}`} className="px-6 py-2 no-underline text-[#10C8B8]">
                            {name}
                          </Link>
                        </td>
                        <td className="px-6 py-2">{email}</td>
                        <td className="px-6 py-2">
                          <span
                            className={`badge ${getStatusBadgeClass(role)} w-[80px] py-2 text-lg`}
                            style={
                              role === "buyer"
                                ? { color: "#fff", backgroundColor: "#1A2B49" }
                                : {}
                            }
                          >
                            {role}
                          </span>
                        </td>
                        <td className="px-6 py-2">{lastLogin}</td>
                        <td className="px-6 py-2">
                          <button
                            className="w-10 bg-yellow-500 rounded mr-1 p-2 text-white"
                            onClick={() => handleEditClick(_id)}
                          >
                            <FaEdit className="me-2" /> Edit
                          </button>
                          <button
                            className={`${
                              role === "banned" ? "bg-green-600 rounded p-2 text-white" : "bg-red-600 rounded p-2 text-white"
                            } me-2`}
                            onClick={() =>
                              handleBanToggle(banUser, queryClient, refetch, _id, role)
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
