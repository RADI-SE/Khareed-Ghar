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

    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    images: {
      type: [String],
      validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
    },
  },
  { timestamps: true }
);

// Helper function to limit the number of images
function arrayLimit(val) {
  return val.length <= 10;
}
export const Product = mongoose.model("Product", ProductSchema);

