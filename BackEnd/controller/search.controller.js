import { Auction } from "../model/auction.model.js";
import { Product } from "../model/product.model.js";

import axios from "axios";
export const searchProduct = async (req, res) => {
    try {
        const { name } = req.query;
        const {type} = req.query; 
        
        const products = await Product.find({});
        const auctions = await Auction.find({});
        const allAuctions = auctions.map(auction => 
            `ID: ${auction._id}\nProductId: ${auction.productId}`
        ).join("\n---\n");


        const allProduct = products.map(product =>
            `ID: ${product._id}\nName: ${product.name}`
          ).join("\n---\n");

          const prompt = `
You are an AI assistant helping to filter relevant items based on a user query.

Search Query: ${name}
Search Type: ${type}

${type === "product" ? `
List of Products:
${allProduct}
` : `
List of Auctions:
${allAuctions}

List of Products:
${allProduct}
Note: Only return auction IDs where auction.productId matches product._id and the product is relevant to the query.
`}

Instructions:
- Only include **IDs** of relevant ${type}s.
- Output one ID per line, no explanations.
`;
          const aiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
              contents: [{ parts: [{ text: prompt }] }],
            },
            { headers: { "Content-Type": "application/json" } }
          );
          const aiText = aiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

          console.log("Ai Text", aiText);
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
        console.log(relevantIds);

if (type === "auction") {
  console.log("Test 1");
  const auctions = await Auction.find({ _id: { $in: relevantIds } });

  // Extract productIds from the auctions array
  const productIds = auctions.map(a => a.productId);

  // Fetch corresponding products
  const products = await Product.find({ _id: { $in: productIds }, isAuction: true });

  if (auctions.length === 0) {
    return res.status(404).json({ message: "No auctions found" });
  }

  if (auctions.length > 0) {
    console.log("Modal Consol", auctions, products);
    return res.status(200).json({ message: "Auctions found", auction: auctions, products });
  }
}


    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};