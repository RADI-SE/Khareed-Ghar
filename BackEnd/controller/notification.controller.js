import { BuyerNotification } from "../model/buyer.notification.model";
import { SellerNotification } from "../model/seller.notification.model";

export const getNotifications = async (req, res) => {
  const { receipient } = req.params;
  const notifications = await BuyerNotification.find({ receipient });
  res.status(200).json(notifications);
};  

export const getSellerNotifications = async (req, res) => {
  const { receipient } = req.params;
  const notifications = await SellerNotification.find({ receipient });
  res.status(200).json(notifications);
};






