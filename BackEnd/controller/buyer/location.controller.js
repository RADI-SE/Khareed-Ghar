import {UserLocation, Location} from "../../model/location.model.js" ; 
import { User } from "../../model/user.model.js";
import jwt from "jsonwebtoken";


export const createLocation = async (req, res) => {
  try {
    const { street, state, city, phoneNumber } = req.body;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingLocation = await Location.findById(state);
    if (!existingLocation) {
      return res.status(400).json({ message: "Location not exists for this state and city" });
    }

    const State = {
      _id: existingLocation._id,
      state: existingLocation.state
    };

    const City = {
      _id: existingLocation._id,
      city: existingLocation.city
    };
    const createdBy = {
      _id: user._id,
      name: user.name
    };


    const location = new UserLocation({
      userName: user.name,
      street: street,
      state: State,
      city: City,
      phoneNumber: phoneNumber,
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
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  try {
    const user = await User.findById(userId);  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 

    const userLocations = await UserLocation.find({ createdBy: user._id })

    if (!userLocations.length) {
      return res.status(404).json({ message: "No locations found for the user" });
    }  

    const findState = [];
    const findCity = [];
    for(let i = 0; i < userLocations.length; i++){
      const state = await Location.findById(userLocations[i].state._id);
      const city = await Location.findById(userLocations[i].city._id);
      findState.push(state);
      findCity.push(city);
    }
   
    const formattedLocations = userLocations.map((location, index) => ({
      _id: location._id,
      street: location.street,
      state: findState[index].state,
      city: findCity[index].city,
      phoneNumber: location?.phoneNumber,
    }));

    res.status(200).json( formattedLocations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch locations", error: error.message });
  }
};
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const {  street, state, city, phoneNumber} = req.body;



    const findLocation = await UserLocation.findById(id);
    
    console.log("findLocation",findLocation)

    const test = findLocation.street = street;
    const test2 = findLocation.state = state;
    const test3 = findLocation.city = city;
    const test4 = findLocation.phoneNumber = phoneNumber;
    console.log("test",test)
    const updates = {
      street: findLocation.street, 
      state: findLocation.state, 
      city: findLocation.city, 
      phoneNumber: findLocation.phoneNumber
    }
    const updatedLocation = await UserLocation.findByIdAndUpdate({_id: id}, updates, { new: true }); 
    console.log("updatedLocation",updatedLocation)

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

// Get all states
export const getStates = async (req, res) => {
  try {
    const states = await Location.find({ type: 'state' })
      .select('_id name');
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch states", error: error.message });
  }
};


// Get cities by state ID
export const getCitiesByState = async (req, res) => {
  try {
    const { stateId } = req.params;
    const cities = await Location.find({ 
      type: 'city',
      parentState: stateId 
    }).select('_id name');
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cities", error: error.message });
  }
};