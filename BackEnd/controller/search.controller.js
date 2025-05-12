import { Product } from "../model/product.model.js";

export const searchProduct = async (req, res) => {
    try {
        const { name } = req.query;
        const products = await Product.find({ name: { $regex: name, $options: "i" } });
        if (!products) {
        return res.status(404).json({ message: "No products found" });
    }
    if (products.length === 0) {
        return res.status(404).json({ message: "No products found" });
    }   
    if (products.length > 0) {
        return res.status(200).json({ message: "Products found", products });
    }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};