import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { RegionForm } from "./regionForm";
import {useFetchRegionById} from "../../../../hooks/admin/Region/useFetchRegionById";
import { useEditRegion } from "../../../../hooks/admin/Region/useEditRegion";

export const EditZoonModal = ({ id: zoonId, show, handleClose }) => {
  const token = sessionStorage.getItem("token");

  const { mutate: editZoon, isLoading: isEditing } = useEditRegion(token);
   
  const { data: zoon, isLoading, isError, error } = useFetchRegionById(zoonId._id);


  const handleSubmit = (updatedZoon) => {
    if (!zoonId || !updatedZoon) return;

    editZoon(
      {
        id:zoonId._id,
        state: updatedZoon.state,
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
              <RegionForm zoon={zoon} onSubmit={handleSubmit} />
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
