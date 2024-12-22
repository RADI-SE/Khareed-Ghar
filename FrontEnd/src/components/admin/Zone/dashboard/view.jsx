import React, { useState } from "react";
import { useFetchRegion } from "../../../../hooks/admin/Region/useFetchRegion";
import { RegionTable} from "./RegionTable";

export const DetailedRegionView = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const {
    data: region = [],
    isLoading: isLoadingRegion,
    isError: regionError,
  } = useFetchRegion();

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  if (isLoadingRegion) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (regionError) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Error fetching region: {regionError.message}
      </div>
    );
  }

  console.log("region:",region.locations);
  return (
    <div className="container mt-4">
        <div className="card shadow-lg p-4">
          <h4 className="mb-4"> Region  </h4>
          <RegionTable region={region.locations}/>
        </div>
    </div>
  );
};

export default DetailedRegionView;
