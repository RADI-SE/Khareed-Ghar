import React, { useState } from "react";
import "../style.css";
import {  useCreateRegion as useCreateRegion } from "../../../../hooks/admin/Region/useCreateRegion"

export const AddForm = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const token = sessionStorage.getItem("token");

  const { mutate: createRegion, isLoading } = useCreateRegion(token);

  const userId = sessionStorage.getItem("id");
  

  const handleReset = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setState("");
    setCity("");
  };

  console.log("State",state);
  console.log("City", city);
  console.log("User ID", userId);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    createRegion({
      id: userId,
      state: state,
      city: city,
    });
  };

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit}>
        <h3>Add new Region</h3>
        <div className="form-group">
          <label>State Name</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter State Name"
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

        {/* {Error && <div className="alert alert-danger">{Error}</div>} */}

        <div className="form-btns">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Save"}
          </button>
          <button type="button" onClick={handleReset} disabled={isLoading}>
            {isLoading ? "Adding..." : "Reset"}
          </button>
        </div>
      </form>
    </div>
  );
};
