import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startingBid: {
    type: Number,
    required: true,
    min: 0,
  },
  currentBid: {
    type: Number,
    default: 0, 
  },
  currentBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },

  bidders: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String },
      bidAmount: { type: Number, required: true }, 
      bidTime: { type: Date, default: Date.now }, 
    },
  ],
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'cancelled'],
    default: 'ongoing',
  },
  auctionStatus: {
    type: String,
    enum: ['pending', 'awarded', 'rejected'],
    default: 'pending',
  }
  
});

export const Auction = mongoose.model('Auction', auctionSchema);

 
