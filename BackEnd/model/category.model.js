import mongoose from "mongoose";
const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    },
  description: {
    type: String,  
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
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

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
   
  },
  subcategories: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Must exist for .id() to work
      name: { type: String, required: true },
      description: { type: String, required: true },
      createdAt: { type: Date, required: true},
      updatedAt: { type: Date, required: true },
    },
  ], 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Category = mongoose.model('Category', CategorySchema);
export const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

 
