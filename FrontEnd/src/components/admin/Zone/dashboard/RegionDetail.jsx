import React from "react";
const RegionDetail = ({ selectedRegion}) => {
  
  return (
    <div>
      <h1>{selectedRegion?.state || "No state Available"}</h1>
      <p>{selectedRegion?.city || "No city available."}</p>
    </div>
  );
};

export default RegionDetail;
