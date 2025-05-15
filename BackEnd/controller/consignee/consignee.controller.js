import { Consignee } from "../../model/consignee.model.js";
import { User } from "../../model/user.model.js";
import { Product } from "../../model/product.model.js";
import jwt from "jsonwebtoken";
 

export const acceptConsignment = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const { consignedProducts } = req.body;
        const products = await Product.find({ _id: { $in: consignedProducts } });
        if (products.length === 0) {
            return res.status(400).json({ message: "No products found" });
        }
        
        const consignee = await Consignee.create({ consigneeId: userId, consignedProducts: products });
        res.status(201).json({ status: 201, message: "Consignment accepted", consignee });
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
const consignedProducts = await Product.find({consigneeId: userId});
        res.status(200).json({ message: "Consignee products found", consignedProducts });
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
        const productId = req.params.id; 

        const consignee = await Consignee.findOne({ consigneeId: userId });
        if (!consignee) {
            return res.status(404).json({ message: "No consignee found" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "No product found" });
        }

        if (product.consigneeId && product.consigneeId.toString() === userId) {
     
            await Product.findByIdAndUpdate(productId, { consigneeId: null });
             
            await Consignee.updateOne(
                { consigneeId: userId },
                { $pull: { consignedProducts: productId } }
            );

            res.status(200).json({ 
                message: "Successfully removed product from consignee's list",
                removedProduct: productId
            });
        } else {
            res.status(403).json({ 
                message: "This product is not assigned to you as a consignee"
            });
        }
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