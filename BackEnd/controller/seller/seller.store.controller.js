import SellerStore from "../../model/seller.store.model.js";

export const getSellerStore = async (req, res) => {
    const { sellerId } = req.params;
    const sellerStore = await SellerStore.findOne({ sellerId });
    res.status(200).json(sellerStore);
}

