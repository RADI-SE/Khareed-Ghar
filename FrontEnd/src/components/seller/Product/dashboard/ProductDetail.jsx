import React from "react";
import defaultImage from "../../../../assets/images/default.jpeg";
const ProductDetail = ({ selectedProduct}) => {
 
    console.log("Product", selectedProduct);
  return (
    <div>
      <h1>{selectedProduct?.name || "No Name Available"}</h1>
      <img
        src={selectedProduct?.images || defaultImage}  
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

      {/* <h3>Reviews</h3> */}
      {/* {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <strong>{review.user?.name || "Anonymous"}</strong> (
              {review.rating || "No rating"} stars): {review.comment || "No comment"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet</p>
      )} */}
    </div>
  );
};

export default ProductDetail;
