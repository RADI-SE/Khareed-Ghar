import { BuyerNotification } from "../model/buyer.notification.model.js";
import { SellerNotification } from "../model/seller.notification.model.js";

export const getNotifications = async (req, res) => {
  const { receipient } = req.params;
  try {
    const notifications = await BuyerNotification.find({ receipient });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  

export const getSellerNotifications = async (req, res) => {
  const { id } = req.params;
  try {
    const notifications = await SellerNotification.find({ receipient: id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

export const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;
  try {
    const notification = await SellerNotification.findById(id);
    if(!notification){
      return res.status(404).json({ message: "Notification not found" });
    }
  notification.read = read;
  notification.readAt = new Date();
  await notification.save();
  console.log(notification.readAt);
  res.status(200).json({ message: "Notification updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBuyerNotification = async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;
  try {
    const notification = await BuyerNotification.findById(id);
    if(!notification){
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.read = read;
    notification.readAt = new Date();
    await notification.save();
    res.status(200).json({ message: "Notification updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  






