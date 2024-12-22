import { body } from "express-validator";
import { Location } from "../../model/location.model.js";
import { User } from "../../model/user.model.js";

export const validateMenuInput = [
  body("state").trim().notEmpty().withMessage("State is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
];

export const addLocationToMenu = async (req, res) => {
  try {
    const {id, state, city } = req.body;
    console.log("id, state, city", id, state, city);

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const location = new Location({
      state: state,
      city,
      createdBy: user,
    });

    const savedLocation = await location.save();
    res.status(201).json({
      message: "Location added to menu successfully",
      location: savedLocation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create location", error: error.message });
  }
};

export const getAllMenuItems = async (req, res) => {
  try {
    const locations = await Location.find();
    res
      .status(200)
      .json({ message: "Menu items fetched successfully", locations });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch menu items", error: error.message });
  }
};

// searrch byId
export const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const location = await Location.findById(id);

    if (!location) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: true, location });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch menu item", error: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, city } = req.body;

    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      {  state, city },
      { new: true, runValidators: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({
      message: "Menu item updated successfully",
      location: updatedLocation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update menu item", error: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;

    const deletedLocation = await Location.findByIdAndDelete(id);
    if (!deletedLocation) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    if (state === deletedLocation.state) {
      res.status(200).json({
        message: "Menu item deleted successfully",
        location: deletedLocation,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete menu item", error: error.message });
  }
};
