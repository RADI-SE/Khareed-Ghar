import express from "express";
import { getNotifications, getSellerNotifications, updateNotification } from "../controller/notification.controller.js";

const router = express.Router();

router.get("/buyer-notifications/:id", getNotifications);


router.get("/seller-notifications/:id", getSellerNotifications);
router.put("/seller-notifications/:id", updateNotification);

export default router;

