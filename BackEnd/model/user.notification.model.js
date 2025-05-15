import mongoose from "mongoose";

const userNotificationSchema = new mongoose.Schema(
  {
    receipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    },
    readAt: {
      type: Date,
      default: null
    },
    link: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const UserNotification = mongoose.model("UserNotification", userNotificationSchema); 