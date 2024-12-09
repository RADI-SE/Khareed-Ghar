import mongoose from "mongoose";
 

const LocationSchema = new mongoose.Schema({
  district: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
const LocationSchemaForUser = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^[+]?[0-9]{10,15}$/,
  },
  district: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Location",
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: "Location",
    required: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9]{5}$/,
  },
  addressDetails: {
    type: String,
    trim: true,
    default: "",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
   
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
export const Location = mongoose.model('Location', LocationSchema);
export const UserLocation = mongoose.model('UserLocation', LocationSchemaForUser);
