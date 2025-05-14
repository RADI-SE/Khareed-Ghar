import mongoose from "mongoose";

const consigneeSchema = new mongoose.Schema({
    consigneeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    consignedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
});

export const Consignee = mongoose.model('Consignee', consigneeSchema);

