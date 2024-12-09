import React, { useState, useEffect } from "react";
import "../style.css";
import {  useCreateZoon } from "../../../../hooks/admin/zoon/useCreateZoon"
import { useAdminService } from "../../../../services/admin/useZoonServices/useZoonServices";

export const AddForm = () => {
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");

  const token = sessionStorage.getItem("token");

  const { mutate: createZoon, isLoading } = useCreateZoon(token);

  const { Error, setError, clearError, isError } = useAdminService();

  const userId = sessionStorage.getItem("id");

  useEffect(() => {
    if (isError) {
      setError(Error);
      const timer = setTimeout(() => clearError(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isError, Error, setError, clearError]);

  const handleReset = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setDistrict("");
    setCity("");
  };

  console.log("District",district);
  console.log("City", city);
  console.log("User ID", userId);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    createZoon({
      id: userId,
      district: district,
      city: city,
    });
  };

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit}>
        <h3>Add Zone</h3>
        <div className="form-group">
          <label>District Name</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter District Name"
          />
        </div>

        <div className="form-group">
          <label>City Name</label>
          <textarea
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name" 
          />
        </div>

        {Error && <div className="alert alert-danger">{Error}</div>}

        <div className="form-btns">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Submit"}
          </button>
          <button type="button" onClick={handleReset} disabled={isLoading}>
            {isLoading ? "Adding..." : "Reset"}
          </button>
        </div>
      </form>
    </div>
  );
};
