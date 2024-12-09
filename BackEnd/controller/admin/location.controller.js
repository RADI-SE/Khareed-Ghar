import { body, validationResult } from "express-validator";
import { Location } from "../../model/location.model.js";
import { User } from "../../model/user.model.js";

export const validateMenuInput = [
  body("district").trim().notEmpty().withMessage("District is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
];

export const addLocationToMenu = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: errors.array() });
    }

    const { userId, district, city } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findOne(userId.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const location = new Location({
      district,
      city,
      createdBy: userId,
    });

    const savedLocation = await location.save();
    res
      .status(201)
      .json({
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
    const locations = await Location.find({ createdBy: req.user.id });
    res
      .status(200)
      .json({ message: "Menu items fetched successfully", locations });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch menu items", error: error.message });
  }
};
 
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { district, city } = req.body;

    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { district, city },
      { new: true, runValidators: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res
      .status(200)
      .json({
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

    const deletedLocation = await Location.findByIdAndDelete(id);

    if (!deletedLocation) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res
      .status(200)
      .json({
        message: "Menu item deleted successfully",
        location: deletedLocation,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete menu item", error: error.message });
  }
};
