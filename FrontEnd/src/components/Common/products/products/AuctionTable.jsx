import {useFetchUserAuction} from "../../../../hooks/seller/Auctions/useFetchUserAuction"
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { useState } from 'react';
import Pagination from "../../pagination";
import EditAuctionModal from "../../../seller/Product/edit/editAuctionModal";


const AuctionTable = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchUserAuction(); // Fetch auctions using the hook
  
  
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
  

    const handleEditClick = (auction) => {
      setSelectedAuction(auction);
      setShowEditModal(true);
    };
    
    const handleModalClose = () => {
      setShowEditModal(false);
      setSelectedAuction();
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
   };
 

  const handleDeleteClick = (auction) => {
  };
 
  return (
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
  <table className="w-full text-sm text-left text-gray-500">
    <thead className="text-xs text-white uppercase bg-blue-950">
      <tr>
        <th className="px-6 py-3">S.N</th>
        <th className="px-6 py-3">Product ID</th>
        <th className="px-6 py-3">Product Name</th>
        <th className="px-6 py-3">Brand</th>
        <th className="px-6 py-3">Image</th>
        <th className="px-6 py-3">Created Date</th>
        <th className="px-6 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {isLoading ? (
        <tr>
          <td colSpan="7">Loading...</td>
        </tr>
      ) : isError ? (
        <tr>
          <td colSpan="7" className="text-red-500">{error?.message || 'An error occurred'}</td>
        </tr>
      ) : paginatedAuctions.map((auction, index) => {
        const { _id, productsName, productsImg, startingBid, startTime, endTime } = auction;
        return (
          <tr
            key={_id}
            className="bg-white-500 border-b hover:bg-gray-300"
          >
            <td className="px-6 py-2">{startIndex + index + 1}</td>
            <td className="px-6 py-2">{_id}</td>
            <td className="px-6 py-2">{productsName}</td>
            <td className="px-6 py-2">{productsImg}</td>
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
              {new Date(startTime).toLocaleDateString()}
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
                onClick={() => handleDeleteClick(auction)}
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
            {/* <ConfirmationModal
              show={showDeleteModal}
              onClose={handleDeleteModalClose}
              onConfirm={handleDelete}
              isLoading={false}
              modalMessage={modalMessage}
              confirmationName={confirmationName}
              setConfirmationName={setConfirmationName}
              selectedName={selectedProduct.name}
            /> */}
          </>
        )}

  </div>
  );
};

export default AuctionTable;
