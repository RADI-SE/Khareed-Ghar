import express from "express";
import { getSellerStore } from "../../controller/seller/seller.store.controller.js";

const router = express.Router();

router.get("/seller-store", getSellerStore);
export default router;

