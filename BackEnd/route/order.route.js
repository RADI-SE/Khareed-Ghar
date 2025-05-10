import express from "express";
import { createOrder, getUserOrders, getAllOrders } from "../controller/seller/order.controller.js";    

const router = express.Router();

router.post("/", createOrder);
router.get("/get-user-orders", getUserOrders);
router.get("/all-orders", getAllOrders);
export default router;
