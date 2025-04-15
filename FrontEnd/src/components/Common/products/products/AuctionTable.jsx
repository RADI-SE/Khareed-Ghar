import {useFetchUserAuction} from "../../../../hooks/seller/Auctions/useFetchUserAuction"
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { useState } from 'react';
import Pagination from "../../pagination";
import EditAuctionModal from "../../../seller/Product/edit/editAuctionModal";
import {AuctionConfirmationModal} from "../../confirmationModal/AuctionConfirmationModel";
import { useSellerService } from "../../../../services/seller/sellerServices";
import DetailAuction from "./DetailAuction";

const AuctionTable = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchUserAuction(); 
  
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { deleteAuction } = useSellerService();

    const handleEditClick = (auction) => {
      setSelectedAuction(auction);
      setShowEditModal(true);
      setShowDeleteModal(false);
    };
    
    const handleModalClose = () => {
      setShowEditModal(false);
      setShowDeleteModal(false);
    };

  const auctions = Array.isArray(data) ? data : data ? [data] : [];

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 4;
  const startIndex = currentPage * rowsPerPage;
  
  const paginatedAuctions = auctions.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const defaultImage = "/placeholder-image.jpg";  

  const onProductClick = (auction) => {
    setSelectedAuction(auction);
  };

  const handleDeleteModalClose = (auction) => {
    setSelectedAuction(auction);
    setShowDeleteModal(true);
    setModalMessage("Are you sure you want to delete this auction?");
  };
 
  const handleDelete = async () => {
    console.log("selectedAuction", selectedAuction);
    await deleteAuction(selectedAuction.auctionId);
    refetch();
    handleModalClose();
  };
 
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {selectedAuction ? (
        <DetailAuction
          auction={selectedAuction}
          onBack={() => setSelectedAuction(null)}
          onEdit={handleEditClick}
          onDelete={handleDeleteModalClose}
          defaultImage={defaultImage}
        />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-blue-950">
              <tr>
                <th className="px-6 py-3">S.N</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Starting Bid</th>
                <th className="px-6 py-3">Start Time</th>
                <th className="px-6 py-3">End Time</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="8">Loading...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="8" className="text-red-500">{error?.message || 'An error occurred'}</td>
                </tr>
              ) : paginatedAuctions.map((auction, index) => {
                const { _id, productsName, productsImg, startingBid, startTime, endTime } = auction;
                const isActive = new Date(endTime) > new Date();
                
                return (
                  <tr
                    key={_id}
                    className="bg-white-500 border-b hover:bg-gray-300"
                  >
                    <td className="px-6 py-2">{startIndex + index + 1}</td>
                    <td className="px-6 py-2">{productsName}</td>
                    <td className="px-6 py-2">
                      <img
                        src={
                          `../../../../../public/images${productsImg}` || defaultImage
                        }
                        alt={productsName}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td className="px-6 py-2">
                      {startingBid}
                    </td>
                    <td className="px-6 py-2">
                      {startTime}
                    </td>
                    <td className="px-6 py-2">
                      {endTime}
                    </td>
                    <td className="px-6 py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {isActive ? 'Active' : 'Expired'} 
                      </span>
                    </td>
                    <td className="px-2 py-2">
                      <button 
                        className="w-4 h-5 mr-2 text-yellow-500"
                        onClick={() => onProductClick(auction)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="w-4 h-5 mr-2 text-green-600"
                        onClick={() => handleEditClick(auction)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="w-4 h-5 text-red-500"
                        onClick={() => handleDeleteModalClose(auction)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            totalItems={auctions.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {selectedAuction && (
        <>
          <EditAuctionModal 
            id={selectedAuction.auctionId}
            show={showEditModal}
            handleClose={handleModalClose}
            onAuctionUpdated={() => {
              refetch();
              handleModalClose();
            }}
          />
          <AuctionConfirmationModal
            show={showDeleteModal}
            onClose={handleDeleteModalClose}
            onConfirm={handleDelete}
            isLoading={false}
            modalMessage={modalMessage}
          />
        </>
      )}
    </div>
  );
};

export default AuctionTable;
