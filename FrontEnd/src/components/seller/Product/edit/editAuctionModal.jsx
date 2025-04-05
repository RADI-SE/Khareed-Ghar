import React from "react";
import PropTypes from 'prop-types';
import { Modal, Spinner } from "react-bootstrap";
import { useFetchAuctionsById } from "../../../../hooks/seller/Auctions/useFetchAuctionsById";
import { useEditAuctions } from "../../../../hooks/seller/Auctions/useEditAuctions";
import AuctionForm from "./auctionForm";
import { useFetchProductById } from "../../../../hooks/seller/useFetchProductsById";

const EditAuctionModal = ({ id, show, handleClose, onAuctionUpdated }) => {
  
  const { mutate: editAuctions, isLoading: isEditing } = useEditAuctions();
 
  const { data: auction, isLoading, isError, error } = useFetchAuctionsById(id);

  const { data: product } = useFetchProductById(auction?.auction?.productId);
 
  const handleSubmit = (updatedAuctions) => {
    if (!id || !updatedAuctions) return;
    editAuctions({
      id,
      startTime: updatedAuctions.startTime,
      endTime: updatedAuctions.endTime,
    }, {
      onSuccess: () => {
        handleClose(); 
        onAuctionUpdated();  
      },
      onError: (err) => {
        console.error("Error updating Auction:", err);
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold">Extend Auction Time</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {isLoading || isEditing ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3 text-muted">Loading auction details...</p>
          </div>
        ) : isError ? (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Error: {error.message}
          </div>
        ) : (
          <>
            {auction?.auction ? (
              <>
                <div className="auction-info mb-4 p-3 border rounded bg-light">
                  <h5 className="mb-3 fw-bold">Auction Details</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold text-muted">Product Name</label>
                      <p className="mb-0 fs-5">{product?.name || "N/A"}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold text-muted">Current End Time</label>
                      <p className="mb-0 fs-5">{auction?.auction?.endTime || "N/A"}</p>
                    </div>
                  </div>
                </div>
                <div className="auction-form">
                  <h5 className="mb-3 fw-bold">Update Auction Time</h5>
                  <AuctionForm auction={auction.auction} onSubmit={handleSubmit} />
                </div>
              </>
            ) : (
              <div className="alert alert-warning">
                <i className="bi bi-exclamation-circle-fill me-2"></i>
                No Auction data available.
              </div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

EditAuctionModal.propTypes = {
  id: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onAuctionUpdated: PropTypes.func.isRequired
};

export default EditAuctionModal;
