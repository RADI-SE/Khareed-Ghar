import React, { useState } from "react";
import { useFetchZoon } from "../../../../hooks/admin/zoon/useFetchZoon";
import {ZoonTable} from "./ZoonTable";

export const DetailedZoonView = () => {
  const [selectedZoon, setSelectedZoon] = useState(null);

  const {
    data: zoon = [],
    isLoading: isLoadingZoon,
    isError: zoonError,
  } = useFetchZoon();

  const handleZoonClick = (zoon) => {
    setSelectedZoon(zoon);
  };

  if (isLoadingZoon) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (zoonError) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Error fetching zoon: {zoonError.message}
      </div>
    );
  }

  console.log("Zoons:",zoon.locations);
  return (
    <div className="container mt-4">
        <div className="card shadow-lg p-4">
          <h4 className="mb-4">Zoon 2 </h4>
          <ZoonTable zoon={zoon.locations} onProductClick={handleZoonClick} />
        </div>
    </div>
  );
};

export default DetailedZoonView;
