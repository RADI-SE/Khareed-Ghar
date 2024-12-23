import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
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
  },
  street: {
    type: String,
    required: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Location",
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: "Location",
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
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
