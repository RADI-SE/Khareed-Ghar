import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Form, Button } from "react-bootstrap";

const AuctionForm = ({ auction, onSubmit }) => {
  const [startTime, setStartTime] = useState(auction?.startTime || "");
  const [endTime, setEndTime] = useState(auction?.endTime || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (!value) return;
  
    if (name === "startTime") {
      setStartTime(value);
    } else if (name === "endTime") {
      setEndTime(value);
    }
  };
  
  const handleSubmit = (e) => { 
    e.preventDefault();
    onSubmit({ startTime, endTime });
  };

  return (
    <Form onSubmit={handleSubmit} className="auction-form-container">
      <div className="row">
        <div className="col-md-6 mb-4">
          <Form.Group>
            <Form.Label className="fw-semibold">Start Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="startTime"
              value={startTime}
              onChange={handleChange}
              className="form-control-lg"
              required
            />
            <Form.Text className="text-muted">
              Set the new start time for the auction
            </Form.Text>
          </Form.Group>
        </div>

        <div className="col-md-6 mb-4">
          <Form.Group>
            <Form.Label className="fw-semibold">End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endTime"
              value={endTime}
              onChange={handleChange}
              className="form-control-lg"
              required
            />
            <Form.Text className="text-muted">
              Set the new end time for the auction
            </Form.Text>
          </Form.Group>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <Button 
          type="submit"  
          className="px-4 py-2 text-white bg-[#10C8B8] hover:bg-[#0eb2a6] rounded-lg"
        >
          <i className="bi bi-clock me-2"></i>
          Update Auction Time
        </Button>
      </div>
    </Form>
  );
};

AuctionForm.propTypes = {
  auction: PropTypes.shape({
    startTime: PropTypes.string,
    endTime: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AuctionForm;
