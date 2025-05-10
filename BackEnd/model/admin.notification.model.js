import mongoose from "mongoose";

const AdminNotificationSchema = new mongoose.Schema(
  {
    receipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    auctionEnded: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);  


AdminNotificationSchema.index({ readAt: 1 }, { expireAfterSeconds: 120  });
export const AdminNotification = mongoose.model("AdminNotification", AdminNotificationSchema);