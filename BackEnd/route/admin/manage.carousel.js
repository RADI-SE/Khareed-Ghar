import express from "express";
import { createCarousel, updateCarousel, deleteCarousel, getCarousel } from "../../controller/admin/carousel.controller.js";
import { upload } from "../../Utils/multerconfig.js";

const router = express.Router();

router.post("/carousel", upload.single("image"), createCarousel);
router.put("/carousel/:id", upload.single("image"), updateCarousel);
router.delete("/carousel/:id", deleteCarousel);
router.get("/carousel", getCarousel);

export default router;

