import { User } from "../model/user.model.js";
import {SellerStore} from "../model/seller.store.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const editUserProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    let user = await User.findById(userId);
    const sellerStore = await SellerStore.find({ sellerId: user._id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", showToast: true });
    }

    const { name, email, password, confirmPassword, storeName, isStore, businessType, storeTagline, physicalStoreAddress, phoneNumber, bankAccountNumber, bankName } = req.body;
    
    let updateMessage = "Profile updated successfully";
    let hasUpdates = false;
    if (name) {
      user.name = name;
      hasUpdates = true;
    }

    if (email) {
      user.email = email;
      hasUpdates = true;
    }

    // Handle password update
    if (password?.oldPassword && password?.newPassword) {
      if (password.newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 8 characters long",
          showToast: true,
        });
      }

      const isPasswordValid = await bcrypt.compare(password.oldPassword, user.password);
      
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
          showToast: true,
        });
      }

      const hashedNewPassword = await bcrypt.hash(password.newPassword, 10);
      user.password = hashedNewPassword;
      hasUpdates = true;
      updateMessage = "Password updated successfully";
    }

    // Handle seller store updates
    if (user.role === "seller" || user.role === "Seller") {
      if (sellerStore && sellerStore.length > 0) {
        if (storeName) {
          sellerStore[0].storeName = storeName;
          hasUpdates = true;
        }
        if (businessType) {
          sellerStore[0].businessType = businessType;
          hasUpdates = true;
        }
        if (storeTagline) {
          sellerStore[0].storeTagline = storeTagline;
          hasUpdates = true;
        }
        if (physicalStoreAddress) {
          sellerStore[0].physicalStoreAddress = physicalStoreAddress;
          hasUpdates = true;
        }
        if (phoneNumber) {
          sellerStore[0].phoneNumber = phoneNumber;
          hasUpdates = true;
        }
        if (bankAccountNumber) {
          sellerStore[0].bankAccountNumber = bankAccountNumber;
          hasUpdates = true;
        }
        if (bankName) {
          sellerStore[0].bankName = bankName;
          hasUpdates = true;
        }

        if (hasUpdates) {
          await sellerStore[0].save();
        }
      }
    }

    if (hasUpdates) {
      await user.save();
      return res.status(200).json({
        success: true,
        message: updateMessage,
      });
    }

    return res.status(200).json({
      success: true,
      message: "No changes were made",
    });

  } catch (error) {
    console.error("Error in editUserProfile:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId).select("-password -confirmPassword");


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
}
