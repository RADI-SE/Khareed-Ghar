import { User } from "../model/user.model.js";
import SellerStore from "../model/seller.store.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const editUserProfile = async (req, res) => {
  try {
    console.log("Test 0 Passed");
    // const { id } = req.params;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    let user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", showToast: true });
    }

    const { name, email, password, confirmPassword, storeName, isStore, businessType, storeTagline, physicalStoreAddress, phoneNumber, bankAccountNumber, bankName } = req.body;
   
    console.log("req.body", req.body);
    if(name){
        user.name = name;
    }

    if(email){
        user.email = email;
    }

    if(password && confirmPassword){
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
                showToast: true,
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
                showToast: true,
            });
        }
        if (password === user.password) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as the old password",
                showToast: true,
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

        user.password = hashedPassword;
        user.confirmPassword = hashedConfirmPassword;

    }


    



        if(user.role === "seller" || user.role === "Seller" && isStore){

            const sellerStore = await SellerStore.findOne({ sellerId: user._id });

            if (sellerStore) {
              // Update the existing seller store
              sellerStore.storeName = storeName;
              sellerStore.businessType = businessType;
              sellerStore.storeTagline = storeTagline;
              sellerStore.physicalStoreAddress = physicalStoreAddress;
              sellerStore.phoneNumber = phoneNumber;
              sellerStore.bankAccountNumber = bankAccountNumber;
              sellerStore.bankName = bankName;
              await sellerStore.save();
            }
        }

        await user.save();

        res.status(200).json({
          success: true,
          message: "User profile updated successfully",
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
