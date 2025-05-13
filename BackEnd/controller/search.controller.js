import { Product } from "../model/product.model.js";
import axios from "axios";
export const searchProduct = async (req, res) => {
    try {
        const { name } = req.query;
        const {type} = req.query; 
        
        const products = await Product.find({});
        const allProduct = products.map(product =>
            `ID: ${product._id}\nName: ${product.name}`
          ).join("\n---\n");

          const prompt = `
          You are an AI assistant helping filter user search query product.   
          Instructions:
          - Only keep product that is relevant to the search query.
          - Do not include any explanation.
          - Just return the **IDs** of the relevant products, one per line.
          User search query: ${name}
          Products:
          ${allProduct}
          `;
          const aiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
              contents: [{ parts: [{ text: prompt }] }],
            },
            { headers: { "Content-Type": "application/json" } }
          );
          const aiText = aiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          console.log(aiText);

          const relevantIds = aiText
          .split("\n")
          .filter(line => line.trim() !== "")
          .map(line => line.trim());
          console.log(relevantIds);

        if(type === "product"){
         
            const products = await Product.find({ _id: { $in: relevantIds }, isAuction: false });
            if (products.length === 0) {
                return res.status(404).json({ message: "No products found" });
            }   
            if (products.length > 0) {
                return res.status(200).json({ message: "Products found", products });
            }
        }
        if(type === "auction"){
            const products = await Product.find({ _id: { $in: relevantIds }, isAuction: true });
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