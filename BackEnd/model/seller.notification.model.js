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
    readAt: {
      type: Date,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);  


SellerNotificationSchema.index({ readAt: 1 }, { expireAfterSeconds: 120  });
export const SellerNotification = mongoose.model("SellerNotification", SellerNotificationSchema);