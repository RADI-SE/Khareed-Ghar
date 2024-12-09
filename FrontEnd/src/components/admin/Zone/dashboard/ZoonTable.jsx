import React, { useState } from "react";
import Pagination from "../../../Common/pagination";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditZoonModal from "../edit/editZoonModel"
import { ConfirmationModal } from "../../../Common/confirmationModal/ConfirmationModel";
import { useDeleteZoon } from "../../../../hooks/admin/zoon/useDeleteZoon";
import "../style.css";

export const ZoonTable = ({ zoon }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const rowsPerPage = 4;
  const startIndex = currentPage * rowsPerPage;
  const [selectedZoon, setSelectedZoon] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [confirmationName, setConfirmationName] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const token = sessionStorage.getItem("token");

  const paginatedZoon = zoon.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const { mutate: deleteZoon } = useDeleteZoon(token);

  const handleEditClick = (zoon) => {
    setSelectedZoon(zoon);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedZoon(id);
    setShowDeleteModal(true);
    setConfirmationName();
    setModalMessage("");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setSelectedZoon(null);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setSelectedZoon(null);
  };

  const handleDelete = () => {
    deleteZoon(
      { id: selectedZoon._id, district: selectedZoon.district },
      {
        onSuccess: () => {
          setModalMessage("Zoon deleted successfully!");
          setShowDeleteModal(false);
          refetch();
        },
        onError: () => {
          setModalMessage("Failed to delete zoon. Please try again.");
        },
      }
    );
  };

  return (
    <>
      <table className="table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>S.N</th>
            <th>Zoon ID</th>
            <th>District Name</th>
            <th>City Name </th>
            <th>Created Date </th>
            <th>Action </th>
            
          </tr>
        </thead>
        <tbody>
          {paginatedZoon?.map((zoon, index) => {
            const { _id,district,city, createdAt } = zoon;
            return (
              <tr key={_id}>
                <td>{startIndex + index + 1}</td>
                <td>{_id}</td>
                <td>{district || "N/A"}</td>
                <td>{city || "N/A"}</td>
                <td>{new Date(createdAt).toLocaleDateString() || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditClick(zoon)}
                  >
                    <FaEdit className="me-2" /> Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(zoon)}
                  >
                    <FaTrashAlt className="me-2" /> Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        totalItems={zoon.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {selectedZoon && (
        <>
          <EditZoonModal
            id={selectedZoon}
            show={showEditModal}
            handleClose={handleModalClose}
            onUserUpdated={() => {
              refetch();
              handleModalClose();
            }}
          />
          <ConfirmationModal
            show={showDeleteModal}
            onClose={handleDeleteModalClose}
            onConfirm={handleDelete}
            isLoading={false}
            modalMessage={modalMessage}
            confirmationName={confirmationName}
            setConfirmationName={setConfirmationName}
            selectedCategoryName={selectedZoon.district}
          />
        </>
      )}
    </>
  );
};

export default ZoonTable;
