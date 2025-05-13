import React, { useState } from 'react';
import { FaTimes, FaStar, FaRegStar } from 'react-icons/fa';
import { useBuyerService } from '../../services/buyer/buyerServices';

const FeedBackModal = ({ isOpen, onClose, onSubmit}) => {

  const [formData, setFormData] = useState({
    rating: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (ratingValue) => {
    setFormData(prev => ({
      ...prev,
      rating: ratingValue
    }));
  };

const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Leave Feedback</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
<form onSubmit={handleSubmit} className="p-4 flex flex-col h-full">
  <div className="flex flex-col md:flex-row gap-4 flex-grow">
    <div className="w-full md:w-1/3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Rate Here
      </label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className="cursor-pointer text-yellow-500 text-xl"
            onClick={() => handleRatingClick(value)}
          >
            {value <= formData.rating ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>
    </div>

    <div className="w-full md:w-2/3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Comment Here
      </label>
      <textarea
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        required
        className="w-full h-28 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10C8B8]"
      />
    </div>
  </div>

  <div className="flex justify-end space-x-3 pt-4 mt-auto">
    <button
      type="button"
      onClick={onClose}
      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 bg-[#10C8B8] text-white rounded-md hover:bg-[#0eb2a6]"
    >
      Submit
    </button>
  </div>
</form>
</div>
    </div>
  );
};

export default FeedBackModal;