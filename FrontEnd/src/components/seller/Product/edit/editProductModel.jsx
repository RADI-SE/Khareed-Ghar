import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { ProductForm } from "./productForm"; 
import { useFetchProductById } from "../../../../hooks/seller/useFetchProductsById";
import { useEditProduct } from "../../../../hooks/seller/useEditProduct";

const EditProductModal = ({ id, show, handleClose, onProductUpdated }) => {
  const token = sessionStorage.getItem("token");
 
  const { mutate: editProduct, isLoading: isEditing } = useEditProduct(token);
 
  const { data: product, isLoading, isError, error } = useFetchProductById(id);
 
  const handleSubmit = (updatedProduct) => {
    if (!id || !updatedProduct) return;
 
    editProduct({
      id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      specifications: updatedProduct.specifications,
      price: updatedProduct.price,
      category: updatedProduct.category,
      seller: updatedProduct.seller,
      images: updatedProduct.images,
    }, {
      onSuccess: () => {
        handleClose(); 
        onProductUpdated();  
      },
      onError: (err) => {
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
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
            {product ? (
              <ProductForm product={product} onSubmit={handleSubmit} />
            ) : (
              <div className="alert alert-warning">No product data available.</div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
