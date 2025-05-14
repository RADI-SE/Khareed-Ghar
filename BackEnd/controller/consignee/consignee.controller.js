import { Consignee } from "../../model/consignee.model.js";
import { User } from "../../model/user.model.js";
import { Product } from "../../model/product.model.js";
import jwt from "jsonwebtoken";

export const createConsignee = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const { consignedProducts } = req.body;

        if (!consignedProducts || !Array.isArray(consignedProducts) || consignedProducts.length === 0) {
            return res.status(400).json({ message: "Invalid or empty consigned products array" });
        }

        const products = await Product.find({ _id: { $in: consignedProducts } });
        if (products.length === 0) {
            return res.status(400).json({ message: "No products found" });
        }

        const consignee = await Consignee.create({ consigneeId: userId, consignedProducts: products });
        res.status(201).json({ message: "Consignee created", consignee });
    } catch (error) {
        console.error("Error creating consignee:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getConsigneeProducts = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const consignee = await Consignee.find({ consigneeId: userId }).populate("consignedProducts");
        if (consignee.length === 0) {
            return res.status(404).json({ message: "No consignee found" });
        }
        res.status(200).json({ message: "Consignee products found", consignee });
    } catch (error) {
        console.error("Error fetching consignee products:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const deleteConsignee = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const consignee = await Consignee.findOneAndDelete({ consigneeId: userId });
        if (!consignee) {
            return res.status(404).json({ message: "No consignee found" });
        }
        res.status(200).json({ message: "Consignee deleted", consignee });
    } catch (error) {
        console.error("Error deleting consignee:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getConsigneeById = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const consignee = await Consignee.findOne({ consigneeId: userId }).populate("consignedProducts");
        if (!consignee) {
            return res.status(404).json({ message: "No consignee found" });
        }
        res.status(200).json({ message: "Consignee found", consignee });
    } catch (error) {
        console.error("Error fetching consignee:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};