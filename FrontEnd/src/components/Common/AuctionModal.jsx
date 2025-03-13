import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const ChangeAuction = ({ setAuction, setIsModelOpen, selectedAuction, initialAuction }) => {    

  const [bidAmount, setBidAmount] = useState('');

  const onClose = () => {
    setIsModelOpen(false);
  };
  return (
    <div className='flex flex-row w-full'>
      <img src={initialAuction.images} alt={initialAuction.name} className='w-1/2 h-1/2' />
      <div className='flex flex-col gap-2'>
        <h1>Auction Details</h1>
        <p>Auction ID: {initialAuction._id}</p>
        <p>Auction Name: {initialAuction.name}</p>
        <p>Auction Starting Bid: {initialAuction.startingBid}</p>
        <p>Auction End Date: {initialAuction.endDate}</p>
      <p>Auction Status: {initialAuction.status}</p>
      <p>Auction Current Bid: {initialAuction.currentBid}</p>
      <p>Auction Highest Bidder: {initialAuction.highestBidder}</p>
      <p>Auction Highest Bid: {initialAuction.highestBid}</p>
      
      
      <input
        type="text"
        placeholder="Bid Amount"
        className="border p-2 w-full mb-4"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        />
      <div className="flex justify-end">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          onClick={() => setIsModelOpen(false)}
        >
          Cancel
        </button>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={onClose}
          >
          Save Address
        </button>
      </div>
    </div>
</div>
  );
};
  ChangeAuction.propTypes = { 
  setAuction: PropTypes.func.isRequired,
  setIsModelOpen: PropTypes.func.isRequired,
  selectedAuction: PropTypes.object.isRequired, 
  
};

export default ChangeAuction;




