import express from "express";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  selectedLocation,
} from "../../controller/buyer/location.controller.js";

const router = express.Router();

router.post("/create-location", createLocation);

router.get("/locations", getAllLocations);

router.post("/locations", getLocationById);
 
router.put("/update-location/:id", updateLocation);
 
router.delete("/locations/:id", deleteLocation);

router.get("/selected-location/:id", selectedLocation);

export default router;
