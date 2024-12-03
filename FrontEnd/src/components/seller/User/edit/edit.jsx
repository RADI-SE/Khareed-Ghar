import React, {useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import UserForm from "./UserForm";
import { useEditUsers } from "../../../../hooks/Users/useEditUser";
import { useProfileData } from "../../../../hooks/Users/useUserProfile";

const EditUserModal = ({ userId, show, handleClose, onUserUpdated }) => {
  const token = sessionStorage.getItem("token");
  const {
    mutate: editUserProfile,
    isLoading: isEditing,
    isError,
    error: editError,
  } = useEditUsers(token);

  const {
    mutate: fetchUserProfile,
    error,
    isLoading,
    data: user,
  } = useProfileData(token);

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId);
    }
  }, [userId, fetchUserProfile]);

  const handleSubmit = (updatedUser) => {
    if (!userId || !updatedUser) return;
    editUserProfile(
      { id: userId, user: updatedUser },
      {
        onSuccess: (data) => {
          onUserUpdated(data);
          setTimeout(() => {
            handleClose();
          }, 1000);
        },
        onError: (err) => {},
      }
    );
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading || isEditing ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <> 
            {user && <UserForm user={user} onSubmit={handleSubmit} />}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
