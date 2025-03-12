import React, { useState } from "react";

const AuctionForm = ({ auction, onSubmit }) => {
  const [formData, setFormData] = useState({
    startTime: auction?.startTime || "",
    endTime: auction?.endTime || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Start Time Input */}
      <div className="mb-3">
        <label className="form-label">Start Time</label>
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* End Time Input */}
      <div className="mb-3">
        <label className="form-label">End Time</label>
        <input
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">
        Update Auction
      </button>
    </form>
  );
};

export default AuctionForm;
