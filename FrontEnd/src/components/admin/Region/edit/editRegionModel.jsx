import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { RegionForm } from "./regionForm";
import {useFetchRegionById} from "../../../../hooks/admin/Region/useFetchRegionById";
import { useEditRegion } from "../../../../hooks/admin/Region/useEditRegion";

export const EditRegionModal = ({  regionId, show, handleClose }) => {
  const token = sessionStorage.getItem("token");

  const { mutate: editRegion, isLoading: isEditing } = useEditRegion(token);
   
  const { data: region, isLoading, isError, error } = useFetchRegionById(regionId._id);


  const handleSubmit = (updatedRegion) => {

    
    editRegion(
      {
        id:regionId._id,
        state: updatedRegion.state,
        city: updatedRegion.city,
      },
    );
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Region</Modal.Title>
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
            {region ? (
              <RegionForm region={region} onSubmit={handleSubmit} />
            ) : (
              <div className="alert alert-warning">
                No region data available.
              </div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditRegionModal;
