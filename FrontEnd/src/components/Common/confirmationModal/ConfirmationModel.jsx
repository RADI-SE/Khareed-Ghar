import React from "react";
import { Modal, Button } from "react-bootstrap";
import toast from 'react-hot-toast';

export const ConfirmationModal = ({
  show,
  onClose,
  onConfirm,
  isLoading,
  modalMessage,
  confirmationName,
  setConfirmationName,
  selectedName,
}) => {
  const handleConfirm = () => {
    if (confirmationName.trim() !== selectedName.trim()) {
      toast.error("The name does not match. Please try again.");
      return;
    }
    onConfirm();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete the item "
          <strong>{selectedName}</strong>"?
        </p>
        <p>
          <strong>Note:</strong> Enter the name exactly as shown above to confirm deletion.
        </p>
        <input
          type="text"
          value={confirmationName}
          onChange={(e) => setConfirmationName(e.target.value)}
          placeholder="Enter name to confirm"
          className="form-control"
        />
        {modalMessage && <p className="mt-2 text-center">{modalMessage}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={handleConfirm}
          disabled={isLoading || !confirmationName}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
