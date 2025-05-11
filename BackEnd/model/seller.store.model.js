import mongoose from "mongoose";

const sellerStoreSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
        required: true,
    },
    storeTagline: {
        type: String,
        required: true,
    },
    physicalStoreAddress: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    bankAccountNumber: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    businessPhoto: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date, 
        default: Date.now,
    },
});

export const SellerStore = mongoose.model("SellerStore", sellerStoreSchema);
