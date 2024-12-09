import { body, validationResult } from "express-validator";
import {UserLocation , Location} from "../../model/location.model.js" ; 
import { User } from "../../model/user.model.js";
export const validateCreateLocation = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage("Fullname is required"),
  body("phone")
    .trim()
    .isMobilePhone()
    .withMessage("Valid phone number is required"),
  // body("district")
  //   .trim()
  //   .notEmpty()
  //   .withMessage("District is required"),
  // body("city")
  //   .trim()
  //   .notEmpty()
  //   .withMessage("City is required"),
  body("state")
    .trim()
    .notEmpty()
    .withMessage("State is required"),
  body("area")
    .trim()
    .notEmpty()
    .withMessage("Area is required"),
  body("postalCode")
    .trim()
    .isPostalCode("any")
    .withMessage("Valid postal code is required"),
  body("addressDetails")
    .trim()
    .notEmpty()
    .withMessage("Address details are required"),
];

export const createLocation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }

    const { userId , userName, phone,  LOCATION,  state, area, postalCode, addressDetails } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findOne(userId.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    const existingLocation = await Location.findById(LOCATION._id);
    if(!existingLocation){
      return res.status(400).json({ message: "Location not exists for this district and city" });
    }
    const district = {
      _id: existingLocation._id,
      district: existingLocation.district
    };
    
    const city = {
      _id: existingLocation._id,
      city: existingLocation.city
    };
   
    const location = new UserLocation({
      userName,
      phone,
      district: district,
      city: city,
      state,
      area,
      postalCode,
      addressDetails,
      createdBy: user,
    });

    const savedLocation = await location.save();
    res.status(201).json({ message: "Location created successfully", location: savedLocation });
  } catch (error) {
    res.status(500).json({ message: "Failed to create location", error: error.message });
  }
};   

export const getAllLocations = async (req, res) => {
  try {
    const locations = await UserLocation.find().populate("createdBy", "fullname email");
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch locations", error: error.message });
  }
};
 
export const getLocationById = async (req, res) => {
  try {
    const { id } = req.params;

    const location = await UserLocation.findById(id);

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch location", error: error.message });
  }
};
 
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedLocation = await UserLocation.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({ message: "Location updated successfully", location: updatedLocation });
  } catch (error) {
    res.status(500).json({ message: "Failed to update location", error: error.message });
  }
};
 
export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLocation = await UserLocation.findByIdAndDelete(id);

    if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete location", error: error.message });
  }
};
