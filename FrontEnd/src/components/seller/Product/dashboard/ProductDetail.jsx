import React from "react";
import defaultImage from "../../../../assets/images/default.jpeg";
const ProductDetail = ({ selectedProduct}) => {
 
  return (
    <div>
      <h1>{selectedProduct?.name || "No Name Available"}</h1>
      <img
        src={`../../../../../public/images/${selectedProduct?.images}` || defaultImage}  
        alt={selectedProduct?.name || "Product"}
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
      <h3>Description</h3>
      <p>{selectedProduct?.description || "No description available."}</p>

      <h3>Specifications</h3>
      <ul>
        <li>Capacity: {selectedProduct?.specifications.capacity || "N/A"}</li>
        <li>Color: {selectedProduct?.specifications.color || "N/A"}</li>
        <li>Condition: {selectedProduct?.specifications.condition || "N/A"}</li>
       </ul>

      <h3>Price: ${selectedProduct?.price || "N/A"}</h3>

      <h3>Seller: {selectedProduct?.seller.name || "No seller information available"}</h3>

    </div>
  );
};

export default ProductDetail;
