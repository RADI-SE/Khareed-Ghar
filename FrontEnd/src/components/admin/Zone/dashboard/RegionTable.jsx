import React, { useState } from "react";
import Pagination from "../../../Common/pagination";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditRegionModal from "../edit/editRegionModel"
import { ConfirmationModal } from "../../../Common/confirmationModal/ConfirmationModel";
import { useDeleteRegion } from "../../../../hooks/admin/Region/useDeleteRegion";
import "../style.css";

export const RegionTable = ({ region }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const rowsPerPage = 4;
  const startIndex = currentPage * rowsPerPage;
  const [selectedRegion, setSelectedRegion] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [confirmationName, setConfirmationName] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const token = sessionStorage.getItem("token");

  const paginatedRegion = region.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const { mutate: deleteRegion } = useDeleteRegion(token);

  const handleEditClick = (region) => {
    setSelectedRegion(region);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedRegion(id);
    setShowDeleteModal(true);
    setConfirmationName();
    setModalMessage("");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setSelectedRegion(null);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setSelectedRegion(null);
  };

  const handleDelete = () => {
    deleteRegion(
      { id: selectedRegion._id, state: selectedRegion.state },
      {
        onSuccess: () => {
          setModalMessage("Region deleted successfully!");
          setShowDeleteModal(false);
          refetch();
        },
        onError: () => {
          setModalMessage("Failed to delete Region. Please try again.");
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
            <th>State Name</th>
            <th>City Name </th>
            <th>Created Date </th>
            <th>Action </th>
            
          </tr>
        </thead>
        <tbody>
          {paginatedRegion?.map((region, index) => {
            const { _id,state, city, createdAt } = region;
            return (
              <tr key={_id}>
                <td>{startIndex + index + 1}</td>
                <td>{state || "N/A"}</td>
                <td>{city || "N/A"}</td>
                <td>{new Date(createdAt).toLocaleDateString() || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditClick(region)}
                  >
                    <FaEdit className="me-2" /> Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(region)}
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
        totalItems={region.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {selectedRegion && (
        <>
          <EditRegionModal
            id={selectedRegion}
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
            selectedName={selectedRegion.state}
          />
        </>
      )}
    </>
  );
};

export default RegionTable;
