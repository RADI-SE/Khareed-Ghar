import SellerStore from "../../model/seller.store.model.js";

export const createSellerStore = async (req, res) => {
    const { sellerId, storeName, businessType, storeTagline, physicalStoreAddress, phoneNumber, bankAccountNumber, bankName } = req.body;
    try{
        
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
    await newSellerStore.save();
    res.status(201).json(newSellerStore);

    }catch (error) {
            res.status(500).json({ message: "Error creating seller store", error });
        }
    }

export const getSellerStore = async (req, res) => {
    const { sellerId } = req.params;
    const sellerStore = await SellerStore.findOne({ sellerId });
    res.status(200).json(sellerStore);
}

