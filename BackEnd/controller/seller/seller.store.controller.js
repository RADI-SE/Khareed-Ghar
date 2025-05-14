import {SellerStore} from "../../model/seller.store.model.js";
import { AdminNotification } from "../../model/admin.notification.model.js";
import {User} from "../../model/user.model.js";
import jwt from "jsonwebtoken";
export const createSellerStore = async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sellerId = decoded.userId;

    const { storeName, businessType, storeTagline, physicalStoreAddress, phoneNumber, bankAccountNumber, bankName } = req.body;
    try{
        if(!storeName || !businessType || !storeTagline || !physicalStoreAddress || !phoneNumber || !bankAccountNumber || !bankName){
            return res.status(400).json({ message: "All fields are required" });
        }
    const newSellerStore = new SellerStore({
        sellerId,
        storeName,
        businessType,
        storeTagline,
        physicalStoreAddress,
        phoneNumber,
        bankAccountNumber,
        bankName
    });
    const user = await User.findById(sellerId);
    const adminNotification = new AdminNotification({
        receipient: "6728e930dc54a1f881e1d0cd",
        userRequest: user._id,
        message: `New seller store request from ${user.name}`,
        read: false,
        readAt: null,
        link: `/seller/store/${newSellerStore._id}`
    });
    await newSellerStore.save();
    await adminNotification.save();
    res.status(201).json({ message: "Seller store request sent to admin", newSellerStore });
    }catch (error) {
            res.status(500).json({ message: "Error creating seller store", error });
        }
    }

export const getSellerStore = async (req, res) => {
    const { sellerId } = req.params;
    const sellerStore = await SellerStore.findOne({ sellerId });
    res.status(200).json(sellerStore);
}

