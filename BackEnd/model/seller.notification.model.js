import mongoose from "mongoose";

const SellerNotificationSchema = new mongoose.Schema(
  {
    receipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);  
export const SellerNotification = mongoose.model("SellerNotification", SellerNotificationSchema);