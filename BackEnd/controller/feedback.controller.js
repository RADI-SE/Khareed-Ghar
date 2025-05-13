import { Feedback } from '../model/feedback.model.js';
import jwt from 'jsonwebtoken';
import {Product} from '../model/product.model.js';
import axios from "axios";


export const getFeedBacksByProductId = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found." });
      }
  
      const feedbacks = await Feedback.find({ productId: id });
      if (feedbacks.length === 0) {
        return res.status(200).json({ success: true, feedbacks: [] });
      }
   
      const allFeedbackText = feedbacks.map(fb =>
        `ID: ${fb._id}\nRating: ${fb.rating}\nComment: ${fb.comment}`
      ).join("\n---\n");
   
      const prompt = `
  You are an AI assistant helping filter user product feedback.
  
  Instructions:
  - Only keep feedback that is helpful or neutral (rating >= 3).
  - Ignore negative, spammy, or irrelevant comments (rating < 3).
  - Do not include any explanation.
  - Just return the **IDs** of the relevant feedbacks, one per line.
  
  Feedback:
  ${allFeedbackText}
  `;
  
      const aiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        { headers: { "Content-Type": "application/json" } }
      );
   
      const aiText = aiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
   
      const relevantIds = aiText
        .split("\n")
        .map(line => line.trim())
        .filter(line => /^[a-f0-9]{24}$/.test(line));  
   
      const filteredFeedbacks = feedbacks.filter(fb =>
        relevantIds.includes(fb._id.toString())
      );
  
      return res.status(200).json({ success: true, feedbacks: filteredFeedbacks });
  
    } catch (error) {
      console.error("Error filtering feedbacks:", error.message);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
export const addFeedback = async (req, res) => {
    try {  
        const { productId, rating, comment } = req.body;
        const token  = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const feedback = new Feedback({ productId, userId, rating, comment });
        await feedback.save();
        res.status(201).json({ message: "Feedback added successfully", feedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const token  = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const feedback = await Feedback.findByIdAndUpdate(id, { rating, comment, userId }, { new: true });
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        await Feedback.findByIdAndDelete(id);
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getFeedbackByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const feedbacks = await Feedback.find({ userId });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

