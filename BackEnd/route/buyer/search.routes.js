import { Router } from "express";
import { searchProduct } from "../../controller/search.controller.js";

const router = Router();

router.get("/search", searchProduct);

export default router;