import express from "express";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} from "../../controller/buyer/location.controller.js";

import { validateCreateLocation } from "../../controller/buyer/location.controller.js"
const router = express.Router();

router.post("/create-location",validateCreateLocation, createLocation);

router.get("/locations", getAllLocations);

router.get("/locations/:id", getLocationById);
 
router.put("/locations/:id", updateLocation);
 
router.delete("/locations/:id", deleteLocation);

export default router;
