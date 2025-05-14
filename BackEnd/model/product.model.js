import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    specifications: {
      capacity: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      condition: {
        type: String,
        enum: ["New", "Used"],
        required: true,
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    isAuction: {
      type: Boolean,
      default: false,
    },
    isConsigned: {
      type: Boolean,
      default: false,
    },
    consigneeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    images: {
      type: [String], 
      default: '/src/assets/images/default.jpeg'
    },
  },
  { timestamps: true }
);  
export const Product = mongoose.model("Product", ProductSchema);

