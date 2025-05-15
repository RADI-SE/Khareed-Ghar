import { BuyerNotification } from "../model/buyer.notification.model.js";
import { SellerNotification } from "../model/seller.notification.model.js";
import { AdminNotification } from "../model/admin.notification.model.js";
import jwt from "jsonwebtoken";

export const getNotifications = async (req, res) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;  
  try {
    const notifications = await BuyerNotification.find({ receipient: userId });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  

export const getSellerNotifications = async (req, res) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;  
  try {
    if(userId){
      
    const notifications = await SellerNotification.find({ receipient: userId });
    res.status(200).json(notifications);
    }
    else{
      return res.status(401).json({ message: "Unauthorized" });
    }
    
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


export const getAdminNotifications = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const notifications = await AdminNotification.find({ receipient: userId });
    if(notifications.length === 0){
      return res.status(404).json({ message: "No notifications found" });
    }
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching admin notifications:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAdminNotification = async (req, res) => {
  try {
 
    console.log("HI MESSAGE")
    const {id} = req.params;
    const notification = await AdminNotification.findById(id);
    const { read } = req.body;
    if(!notification){
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.read = read;
    notification.readAt = new Date();
    await notification.save();
    console.log("pass")
    res.status(200).json({ message: "Notification updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




