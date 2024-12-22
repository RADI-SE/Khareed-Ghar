import React from "react";
import { Modal, Button } from "react-bootstrap";

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
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete the category "
          <strong>{selectedName}</strong>"?
        </p>
        <p>
          <strong>Note:</strong> Enter the category name exactly as confirmation.
        </p>
        <input
          type="text"
          value={confirmationName}
          onChange={(e) => setConfirmationName(e.target.value)}
          placeholder="Enter category name"
          className="form-control"
        />
        {modalMessage && <p className="modal-feedback">{modalMessage}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={onConfirm}
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
