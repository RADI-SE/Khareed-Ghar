import express from "express";
import { createOrder } from "../controller/seller/order.controller.js";    

const router = express.Router();

router.post("/", createOrder);
export default router;
