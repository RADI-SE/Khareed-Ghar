import express from "express";
import { createOrder, getUserOrders, getAllOrders } from "../controller/seller/order.controller.js";    

const router = express.Router();

router.post("/", createOrder);
router.get("/", getUserOrders);
router.get("/all", getAllOrders);
export default router;
