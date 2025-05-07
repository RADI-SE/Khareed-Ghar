import express from "express";
import { createCarousel, updateCarousel, deleteCarousel, getCarousel } from "../../controller/admin/carousel.controller.js";
import { upload } from "../../Utils/multerconfig.js";

const router = express.Router();

router.post("/", upload.single("image"), createCarousel);
router.put("/:id", upload.single("image"), updateCarousel);
router.delete("/:id", deleteCarousel);
router.get("/", getCarousel);

export default router;

