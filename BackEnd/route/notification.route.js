import express from "express";
import { getNotifications, getSellerNotifications, updateNotification, updateBuyerNotification, getAdminNotifications } from "../controller/notification.controller.js";

const router = express.Router();

router.get("/buyer-notifications", getNotifications);
router.put("/buyer-notifications/:id", updateBuyerNotification);

router.get("/seller-notifications", getSellerNotifications);
router.put("/seller-notifications/:id", updateNotification);


router.get("/admin-notifications", getAdminNotifications);


export default router;

