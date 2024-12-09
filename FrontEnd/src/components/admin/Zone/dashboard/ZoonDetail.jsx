import React from "react";
const ZoonDetail = ({ selectedZoon}) => {
 
    console.log("ZoonDetail params ", selectedZoon);
  return (
    <div>
      <h1>{selectedZoon?.district || "No district Available"}</h1>
      <p>{selectedZoon?.city || "No city available."}</p>
    </div>
  );
};

export default ZoonDetail;
