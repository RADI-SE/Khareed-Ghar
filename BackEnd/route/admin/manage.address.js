import express from "express";
import { addLocationToMenu, getAllMenuItems, updateMenuItem, deleteMenuItem} from "../../controller/admin/location.controller.js";

import { validateMenuInput } from "../../controller/admin/location.controller.js";
const router = express.Router();

router.post("/add-to-menu", validateMenuInput, addLocationToMenu);

router.get("/all", getAllMenuItems);

router.put("/update/:id", validateMenuInput, updateMenuItem);

router.delete("/delete/:id", deleteMenuItem);

export default router;
