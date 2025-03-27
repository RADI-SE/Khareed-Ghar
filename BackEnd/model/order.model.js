import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  }, 
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },

    paymentMethod: {
        type: String,
        required: true,
      },
      shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserLocation',
    required: true,
},
status: {
  type: String,
  enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  default: 'Pending',
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", orderSchema);
