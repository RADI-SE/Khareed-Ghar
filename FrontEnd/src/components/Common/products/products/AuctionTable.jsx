import {useFetchUserAuction} from "../../../../hooks/seller/Auctions/useFetchUserAuction"
import { FaEdit, FaEye, FaTrashAlt, FaClock, FaDollarSign, FaUser } from "react-icons/fa";
import { useState } from 'react';
import Pagination from "../../pagination";
import EditAuctionModal from "../../../seller/Product/edit/editAuctionModal";
import {AuctionConfirmationModal} from "../../confirmationModal/AuctionConfirmationModel";
import { useSellerService } from "../../../../services/seller/sellerServices";
import { Modal } from "react-bootstrap";
import { useCurrentLeftTime } from "../../../../hooks/seller/Auctions/useFetchCurrentLeftTime";

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
    const [showViewModal, setShowViewModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { deleteAuction } = useSellerService();
    const { data: currentLeftTime } = useCurrentLeftTime(selectedAuction?.auctionId);

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
    setShowViewModal(true);
  };

  const handleViewModalClose = () => {
    setShowViewModal(false);
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
            <Modal show={showViewModal} onHide={handleViewModalClose} centered size="lg" className="auction-view-modal">
              <Modal.Header closeButton className="bg-gradient-to-r from-blue-900 to-blue-800 border-b border-blue-700">
                <Modal.Title className="text-white text-xl font-bold flex items-center">
                  <FaEye className="mr-2" />
                  Auction Details
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-6 bg-gray-50">
                <div className="auction-info space-y-6">
                  {/* Image Section */}
                  <div className="flex justify-center bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src={`../../../../../public/images${selectedAuction.productsImg}` || defaultImage}
                      alt={selectedAuction.productsName}
                      className="h-auto max-w-full object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Timer Section */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-blue-900 border-b pb-2 mb-4 flex items-center">
                      <FaClock className="mr-2" />
                      Time Remaining
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-900">{currentLeftTime?.timeLeft?.days || "0"}</div>
                        <div className="text-sm text-blue-600">Days</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-900">{currentLeftTime?.timeLeft?.hours || "0"}</div>
                        <div className="text-sm text-blue-600">Hours</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-900">{currentLeftTime?.timeLeft?.minutes || "0"}</div>
                        <div className="text-sm text-blue-600">Minutes</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-900">{currentLeftTime?.timeLeft?.seconds || "0"}</div>
                        <div className="text-sm text-blue-600">Seconds</div>
                      </div>
                    </div>
                  </div>

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                      <h3 className="text-lg font-semibold text-blue-900 border-b pb-2">Product Information</h3>
                      <div className="space-y-3">
                        <div>
                          <h6 className="text-sm font-medium text-gray-500">Product Name</h6>
                          <p className="text-lg font-semibold text-gray-800">{selectedAuction.productsName}</p>
                        </div>
                      </div>
                      <div>
                      
                      </div>
                    </div>

                    {/* Auction Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                      <h3 className="text-lg font-semibold text-blue-900 border-b pb-2">Auction Information</h3>
                      <div className="space-y-3">
                        <div>
                          <h6 className="text-sm font-medium text-gray-500">Starting Bid</h6>
                          <p className="text-lg font-semibold text-green-600">${selectedAuction.startingBid}</p>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-500">Start Time</h6>
                          <p className="text-lg font-semibold text-gray-800">{selectedAuction.startTime}</p>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-500">End Time</h6>
                          <p className="text-lg font-semibold text-gray-800">{selectedAuction.endTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bid History Section */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-blue-900 border-b pb-2 mb-4 flex items-center">
                      <FaDollarSign className="mr-2" />
                      Bid History
                    </h3>
                    <div className="space-y-4">
                      {selectedAuction.bidders && selectedAuction.bidders.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                          {selectedAuction.bidders.map((bidder, index) => (
                            <div key={index} className={`py-3 flex justify-between items-center ${index === 0 ? 'bg-green-50' : ''}`}>
                              <div className="flex items-center">
                                <FaUser className="text-gray-400 mr-2" />
                                <span className="text-gray-600">Bidder {index + 1}</span>
                              </div>
                              <div className="flex items-center">
                                <FaDollarSign className="text-green-600 mr-1" />
                                <span className={`font-semibold ${index === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                  {bidder.bidAmount}
                                </span>
                                {index === 0 && (
                                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    Current Bid
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No bids yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                <button
                  onClick={handleViewModalClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </>
        )}

  </div>
  );
};

export default AuctionTable;
