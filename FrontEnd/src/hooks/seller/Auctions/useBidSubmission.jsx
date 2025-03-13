import { useState } from 'react';
import axios from 'axios';

const useBidSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submitBid = async (auctionId, bidAmount) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/bidding/${auctionId}/bid`,
        { bidAmount },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.data.message || 'Failed to place bid');
        return { success: false, error: response.data.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to place bid. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitBid,
    isSubmitting,
    error,
    setError
  };
};

export default useBidSubmission;