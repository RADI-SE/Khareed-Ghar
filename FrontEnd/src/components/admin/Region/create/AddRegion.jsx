import React, { useState } from "react";
import { useCreateRegion } from "../../../../hooks/admin/Region/useCreateRegion";

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


  
  const handleSubmit = (e) => {
    e.preventDefault();
    createRegion({
      id: userId,
      state: state,
      city: city,
    });
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <h3>Add new Region</h3>
        <div className="">
          <label>State Name</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter State Name"
            className="bg-white border border-gray-500 text-gray-900 text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10C8B8]"
          />
        </div>

        <div className="pt-4">
          <label>City Name</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name" 
            className="bg-white border border-gray-500 text-gray-900 text-lg block w-full p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10C8B8]"
          />
        </div>

        {/* {Error && <div className="alert alert-danger">{Error}</div>} */}

        <div className="pt-4">
          <button type="submit" disabled={isLoading} className="text-white bg-[#10C8B8] hover:bg-[#0eb2a6] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            {isLoading ? "Adding..." : "Save"}
          </button>
          <button type="button" onClick={handleReset} disabled={isLoading} className="text-white bg-[#10C8B8] hover:bg-[#0eb2a6] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            {isLoading ? "Adding..." : "Reset"}
          </button>
        </div>
      </form>
    </div>
  );
};
