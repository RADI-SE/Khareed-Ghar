import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { ZoonForm } from "./zoonForm";
import { useFetchZoonById } from "../../../../hooks/admin/zoon/useFetchZoonById";
import { useEditZoon } from "../../../../hooks/admin/zoon/useEditZoon";

export const EditZoonModal = ({ id: zoonId, show, handleClose }) => {
  const token = sessionStorage.getItem("token");

  const { mutate: editZoon, isLoading: isEditing } = useEditZoon(token);
   
  const { data: zoon, isLoading, isError, error } = useFetchZoonById(zoonId._id);


  const handleSubmit = (updatedZoon) => {
    if (!zoonId || !updatedZoon) return;

    editZoon(
      {
        id:zoonId._id,
        district: updatedZoon.district,
        city: updatedZoon.city,
      },
    );
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Zoon</Modal.Title>
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
            {zoon ? (
              <ZoonForm zoon={zoon} onSubmit={handleSubmit} />
            ) : (
              <div className="alert alert-warning">
                No product data available.
              </div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditZoonModal;
