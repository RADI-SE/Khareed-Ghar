import { Product } from "../model/product.model.js";
import { Auction } from "../model/auction.model.js";

export const searchProduct = async (req, res) => {
    try {
        const { name } = req.query;
        const {type} = req.query;  
        if(type === "product"){
            const products = await Product.find({ name: { $regex: name, $options: "i" }, isActive: false });
            if (products.length === 0) {
                return res.status(404).json({ message: "No products found" });
            }   
            if (products.length > 0) {
                return res.status(200).json({ message: "Products found", products });
            }
        }
        if(type === "auction"){
            const products = await Product.find({ name: { $regex: name, $options: "i" }});
            if (products.length === 0) {
                return res.status(404).json({ message: "No auctions found" });
              }
            if (products.length > 0) {
                return res.status(200).json({ message: "Auctions found", products });
            }
        }
 

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};