import {Auction} from "../../model/auction.model.js"
import {Product} from "../../model/product.model.js"
import jwt from "jsonwebtoken"
import { User } from "../../model/user.model.js";

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export const createAuction = async (req, res) => {
  try {  
    const {productId, startingBid, startTime, endTime } = req.body;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    await sleep(2000);
    const product = await Product.findById(productId);
    if (!product || product.seller?.toString() !== userId) {
      return res.status(400).json({ message: 'Invalid product or unauthorized access.' });
    }
 
    const auction = new Auction({
      productId,
      sellerId: userId,
      startingBid,
      currentBid: startingBid,
      startTime,
      endTime,
    });

    await auction.save();
    res.status(201).json({ message: 'Auction created successfully', auction });
  } catch (error) {
    res.status(500).json({ message: 'Error creating auction', error });
  }
};
 
export const getOngoingAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({ status: 'ongoing', endTime: { $gt: Date.now() } })
      .populate('productId', 'name price images')  
      .populate('currentBidder', 'name'); 
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching auctions', error });
  }
};
 
export const placeBid = async (req, res) => {
  try {
    const { auctionId, bidAmount } = req.body;
 
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
 
    if (auction.status !== 'ongoing' || auction.endTime <= Date.now()) {
      return res.status(400).json({ message: 'Auction is no longer active' });
    }
 
    if (bidAmount <= auction.currentBid) {
      return res.status(400).json({ message: 'Bid must be higher than the current bid' });
    }
 
    auction.currentBid = bidAmount;
    auction.currentBidder = req.user.id;
    auction.bidders.push({ userId: req.user.id, bidAmount });

    await auction.save();
    res.status(200).json({ message: 'Bid placed successfully', auction });
  } catch (error) {
    res.status(500).json({ message: 'Error placing bid', error });
  }
};
 
// export const getAuctionDetails = async (req, res) => {
//   try {

//     console.log("Get auction By ID bk")

//     const { auctionId } = req.params;


//     const auction = await Auction.findById(auctionId)
//       .populate('productId', 'name description price images')
//       .populate('bidders.userId', 'name')
//       .populate('currentBidder', 'name');

//     if (!auction) {
//       return res.status(404).json({ message: 'Auction not found' });
//     }

//     res.status(200).json(auction);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching auction details', error });
//   }
// };
 

export const getAuctionDetails = async (req, res) => {
  try {

    
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    
    
    
    const userID = await User.findById(userId)
    // .populate('productId', 'name description price images')
    // .populate('bidders.userId', 'name')
    // .populate('currentBidder', 'name');
    console.log("Get auction By ID bk", userID)


    if (!userID) {
      return res.status(404).json({ message: 'User not found' });
    }
    const UserAuctions = await Auction.find()
     console.log("UserAuctions", UserAuctions)
    const UserAuction = await Auction.findOne(
      {

        sellerId: userID._id
      }
    )
    if(!UserAuction)
    {
      return res.status(404).json({ message: 'No Auction yet'})
    }

    console.log(UserAuction)

    const products = await Product.findById(UserAuction.productId)

    if(!products){
      return res.status(404).json({ message: 'No Auction yet'})
    }
    const auctionDetails = await Promise.all(UserAuctions.map(async (auctionItem) => {
      const product = await Product.findById(auctionItem.productId);
      return {
        auctionId: auctionItem._id,
        startingBid: auctionItem.startingBid,
        currentBid: auctionItem.currentBid,
        currentBidder: auctionItem.currentBidder,
        startTime: auctionItem.startTime,
        endTime: auctionItem.endTime,
        status: auctionItem.status,
        productsName: product ? product.name : 'N/A',
        productsImg: product ? product.images : null,
      };
    }));

    res.status(200).json({ sellerId: userID._id, auctions: auctionDetails });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching auction details', error });
  }
};





export const completeAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Check if the auction is already completed
    if (auction.status !== 'ongoing') {
      return res.status(400).json({ message: 'Auction is not active' });
    }

    // Mark auction as completed
    auction.status = 'completed';
    await auction.save();

    res.status(200).json({ message: 'Auction marked as completed', auction });
  } catch (error) {
    res.status(500).json({ message: 'Error completing auction', error });
  }
};

 
