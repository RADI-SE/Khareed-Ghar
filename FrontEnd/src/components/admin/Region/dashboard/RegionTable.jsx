import React, { useState } from "react";
import Pagination from "../../../Common/pagination";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditRegionModal from "../edit/editRegionModel"
import { ConfirmationModal } from "../../../Common/confirmationModal/ConfirmationModel";
import { useDeleteRegion } from "../../../../hooks/admin/Region/useDeleteRegion";

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


  console.log("Region selected successfully:::::::", selectedRegion)
  return (
    <div className="rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-white uppercase bg-blue-950">
          <tr>
            <th className="px-6 py-3">S.N</th>
            <th className="px-6 py-3">State Name</th>
            <th className="px-6 py-3">City Name </th>
            <th className="px-6 py-3">Created Date </th>
            <th className="px-6 py-3">Action </th>
            
          </tr>
        </thead>
        <tbody>
          {paginatedRegion?.map((region, index) => {
            const { _id,state, city, createdAt } = region;
            return (
              <tr key={_id}>
                <td className="px-6 py-2">{startIndex + index + 1}</td>
                <td className="px-6 py-2">{state || "N/A"}</td>
                <td className="px-6 py-2">{city || "N/A"}</td>
                <td className="px-6 py-2">{new Date(createdAt).toLocaleDateString() || "N/A"}</td>
                <td className="px-6 py-2">
                  <button
                    className="ml-3 p-2 w-20 bg-yellow-400 text-white rounded-lg"
                    onClick={() => handleEditClick(region)}
                  >
                    <FaEdit className="me-2" /> Edit
                  </button>
                  <button
                    className="ml-3 p-2 w-20 bg-red-500 text-white rounded-lg"
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
            regionId={selectedRegion}
            show={showEditModal}
            handleClose={handleModalClose}
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
    </div>
  );
};

export default RegionTable;
