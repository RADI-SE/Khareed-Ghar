import {UserLocation, Location} from "../../model/location.model.js" ; 
import { User } from "../../model/user.model.js";


export const createLocation = async (req, res) => {
  try {
    const { userId, street, LOCATION, phoneNumber } = req.body;
   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    console.log("LOCATION", LOCATION);
    const existingLocation = await Location.findById(LOCATION);
    if(!existingLocation){
      return res.status(400).json({ message: "Location not exists for this state and city" });
    }
    const state = {
      _id: existingLocation._id,
      state: existingLocation.state
    };
    
    const city = {
      _id: existingLocation._id,
      city: existingLocation.city
    };
    const createdBy = {
      _id: user._id,
      name: user.name
    };
   
    const location = new UserLocation({
      userName: user.name,
      street,
      state: state,
      city: city,
      phoneNumber,
      createdBy: createdBy,
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

  const {userId} = req.body;
  try {
    const locations = await UserLocation.find();  
    const user = await User.findById(userId);  
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    const location = locations.find(loc => loc.createdBy.toString() === user._id.toString());
    
    if (!location) {
      return res.status(404).json({ message: "Location not found for the user" });
    }
  
    const findById = await UserLocation.findById(location._id);
  
    res.status(200).json(findById);
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
