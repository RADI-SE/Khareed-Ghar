import { Modal, Button } from "react-bootstrap";
export const AuctionConfirmationModal = ({
  show,
  onClose,    
  onConfirm,
  isLoading,
  modalMessage,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };
  const handleClose = () => {
    onClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
