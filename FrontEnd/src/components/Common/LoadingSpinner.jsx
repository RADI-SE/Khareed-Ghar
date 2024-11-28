import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return null; // Return null if not loading
};

export default LoadingSpinner;
