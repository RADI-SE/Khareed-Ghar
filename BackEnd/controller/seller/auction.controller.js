import {Auction} from "../../model/auction.model.js"
import {Product} from "../../model/product.model.js"
import { SellerNotification } from "../../model/seller.notification.model.js";
import { BuyerNotification } from "../../model/buyer.notification.model.js";
import { User } from "../../model/user.model.js";
import { Cart } from "../../model/cart.model.js";
import jwt from "jsonwebtoken"


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
    const auctions = await Auction.find({ status: 'ongoing' })
      .populate('productId', 'name price images')  
      .populate('currentBidder', 'name'); 
    console.log("auctions", auctions)
    res.status(200).json({ success: true, auctions: auctions || [] });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching auctions', 
      error: error.message 
    });
  }
};
export const placeBid = async (req, res) => {
  try {
    const { auctionId, bidAmount } = req.body;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

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
 
    const fetchUser = await User.findById(userId); 
    if (!fetchUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const previousBidderId = auction.currentBidder;
    console.log("previousBidderId", previousBidderId)
    auction.currentBid = bidAmount;
    auction.currentBidder = fetchUser._id;
     
    auction.bidders.push({ userId: fetchUser._id , name: fetchUser.name,  bidAmount });

    await auction.save();
    const sellerNotification = new SellerNotification({
      receipient: auction.sellerId,
      auction: auction._id,
      message: `${fetchUser.name} placed a new bid of $${bidAmount}`,
      read: false,
      readAt: null,
      link: `/auction/${auction._id}`,
    });
    
    await sellerNotification.save();

    if (previousBidderId && previousBidderId.toString() !== fetchUser._id.toString() ) {
      const buyerNotification = new BuyerNotification({
        receipient: previousBidderId,
        product: auction.productId,
        message: `You've been outbid by ${fetchUser.name} with $${bidAmount}`,
        link: `/auction/${auction._id}`,
      });
      await buyerNotification.save();
    }
    
    res.status(200).json({ message: 'Bid placed successfully', auction });
  } catch (error) {
    res.status(500).json({ message: 'Error placing bid', error });
  }
};

export const getAuctionDetails = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const { id } = req.params;
    const UserAuctions = await Auction.find({ sellerId: userId }); // Query only the auctions of the specific user

    const auctionDetails = [];

    for (let i = 0; i < UserAuctions.length; i++) {
      const auctionItem = UserAuctions[i];
      let product = null;
      try {
        product = await Product.findById(auctionItem.productId);
      } catch (error) {
        console.error("Error fetching product for auction:", error);
      }

      auctionDetails.push({
        auctionId: auctionItem._id,
        startingBid: auctionItem.startingBid,
        currentBid: auctionItem.currentBid,
        currentBidder: auctionItem.currentBidder,
        startTime: auctionItem.startTime,
        endTime: auctionItem.endTime,
        status: auctionItem.status,
        productsName: product ? product.name : 'Product not found',
        productsImg: product ? product.images : null,
      });
    }

    res.status(200).json({ sellerId: userId, auctions: auctionDetails });
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

export const getAuctionsById = async (req, res) => {
  try {
    const { id } = req.params;
      const auction = await Auction.findById(id)
      // .populate("category")
      // .populate("seller");
     

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "auction not found.",
      });
    }

    res.status(200).json({
      success: true,
      auction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const editAuctions = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      startTime,
      endTime,
    } = req.body;

    const updatedAuctions = await Auction.findByIdAndUpdate(
      id,
      {
        status: 'ongoing',
        startTime,
        endTime,

      },
      { new: true }
    );

    if (!updatedAuctions) {
      return res.status(404).json({
        success: false,
        message: "Auction not found.",
      });
    }

    for(let i = 0; i < updatedAuctions.bidders.length; i++)
    {
      const buyerNotification = new BuyerNotification({
        receipient: updatedAuctions.bidders[i].userId,
        product: updatedAuctions.productId,
        message: `Auction has been updated.`,
        link: `/auction/${updatedAuctions._id}`,
      });
      await buyerNotification.save();
    }
    res.status(200).json({
      success: true,
      message: "Auction updated successfully.",
      auction: updatedAuctions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};


export const deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findByIdAndDelete(id);

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found.",
      });
    }
    for(let i = 0; i < auction.bidders.length; i++)
    {
      const buyerNotification = new BuyerNotification({
        receipient: auction.bidders[i].userId,
        product: auction.productId,
        message: `Auction has been deleted.`,
        link: `/auction/${auction._id}`,
      });
      await buyerNotification.save();
    }
    res.status(200).json({
      success: true,
      message: "Auction deleted successfully.",
      auction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

 

export const getCurrentLeftTime = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findById(id);

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found.",
      });
    }

    const currentTime = new Date();
    const endTime = new Date(auction.endTime);
    const timeLeftInMillis = endTime - currentTime;


     if (timeLeftInMillis <= 0) {
       if (auction.status !== "completed") {
        auction.status = "completed";
        await auction.save();
        const findCurrentBidder = await User.findById(auction.currentBidder);

         const sellerNotification = new SellerNotification({
          receipient: auction.sellerId,
          auction: auction._id,
          message: `Auction has ended. ${findCurrentBidder.name} won with a bid of ${auction.currentBid}.`,
          read: false,
          readAt: null,
          auctionEnded: true,
          link: `/auction/${auction._id}`,
        });
        await sellerNotification.save();

         const buyerNotification = new BuyerNotification({
          receipient: auction.currentBidder,
          product: auction.productId,
          message: `Congratulations! You won the auction.`,
          link: `/auction/${auction._id}`,
        });
        await buyerNotification.save();
        auction.auctionStatus = "pending";
        await auction.save();
      }
      return res.status(200).json({
        success: true,
        status: "completed",
        timeLeft: 0,
        message: "Auction has ended.",
      });
    }
    const seconds = Math.floor((timeLeftInMillis / 1000) % 60);
    const minutes = Math.floor((timeLeftInMillis / (1000 * 60)) % 60);
    const hours = Math.floor((timeLeftInMillis / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeLeftInMillis / (1000 * 60 * 60 * 24));

    res.status(200).json({
      success: true,
      status: auction.status,
      timeLeft: {
        totalMilliseconds: timeLeftInMillis,
        days,
        hours,
        minutes,
        seconds,
      },
    });
  } catch (error) {
    console.error("Error in getCurrentLeftTime:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const getAuctionStatus = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const {auctionStatus} = req.body;
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found.",
      });
    } 
    if(auctionStatus === true )
    {
      const findHighestBidder = await User.findById(auction.currentBidder);
      const buyerNotification = new BuyerNotification({
        receipient: findHighestBidder._id,
        
        product: auction.productId,
        message: `You have been awarded the auction,please continue with the payment process.`,
        link: `/auction/${auction._id}`,
      });

      auction.auctionStatus = "awarded";
      await auction.save();
      await buyerNotification.save();
      console.log("findHighestBidder", findHighestBidder._id);
      const cart = await Cart.findOne({user: findHighestBidder._id});
      if(!cart)
      {
        const cart = new Cart({
          user: findHighestBidder._id,
          items: [
            {
              product: auction.productId,
              quantity: 1,
              price: auction.currentBid,
              total: auction.currentBid,
            },
          ],
          totalAmount: auction.currentBid,
        });
        await cart.save();
      }
      else
      {
        cart.items.push({
          product: auction.productId,
          quantity: 1,
          price: auction.currentBid,
          total: auction.currentBid,
        });
        cart.totalAmount = auction.currentBid;
      }
      await cart.save();
      console.log(" added to cart", cart);
      await cart.save();
    console.log("passed to cart");

    }
    if(auctionStatus === false)
    {
      const findHighestBidder = await User.findById(auction.currentBidder);
      const buyerNotification = new BuyerNotification({
        receipient: findHighestBidder._id,
        product: auction.productId,
        message: `You have been rejected from the auction, please try again later.`,
        link: `/auction/${auction._id}`,
      });  
      auction.auctionStatus = "rejected";
      await auction.save();
      await buyerNotification.save();
    } 
    console.log("passed to cart");
    await auction.save();
    res.status(200).json({
      success: true,
      auctionStatus: auctionStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

