import express from "express";
import { addLocationToMenu, getAllMenuItems, updateMenuItem, deleteMenuItem, getMenuItemById} from "../../controller/admin/location.controller.js";

import { validateMenuInput } from "../../controller/admin/location.controller.js";
const router = express.Router();

router.post("/add-to-menu",  addLocationToMenu);

router.get("/all", getAllMenuItems);

router.put("/update/:id", validateMenuInput, updateMenuItem);

router.get("/search/:id", getMenuItemById);

router.delete("/delete/:id", deleteMenuItem);

export default router;
