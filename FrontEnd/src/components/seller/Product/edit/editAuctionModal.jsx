import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useFetchAuctionsById } from "../../../../hooks/seller/Auctions/useFetchAuctionsById";
import { useEditAuctions } from "../../../../hooks/seller/Auctions/useEditAuctions";
import AuctionForm from "./auctionForm";

const EditAuctionModal = ({ id, show, handleClose, onAuctionUpdated }) => {
  const token = sessionStorage.getItem("token");
 
  const { mutate: editAuctions, isLoading: isEditing } = useEditAuctions(token);
 
  const { data: auction, isLoading, isError, error } = useFetchAuctionsById(id);
  
 
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Extend Auction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading || isEditing ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : isError ? (
          <div className="alert alert-danger">Error: {error.message}</div>
        ) : (
          <>
            {auction ? (
              <AuctionForm auction={auction} onSubmit={handleSubmit} />
            ) : (
              <div className="alert alert-warning">No Auction data available.</div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditAuctionModal;
