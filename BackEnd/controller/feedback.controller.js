import { Feedback } from '../model/feedback.model.js';
import jwt from 'jsonwebtoken';
export const addFeedback = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const token  = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const feedback = new Feedback({ productId, userId, rating, comment });
        await feedback.save();
        res.status(201).json(feedback);
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

export const getFeedbackByProductId = async (req, res) => {
    try {
        const { productId } = req.params;   
        const feedbacks = await Feedback.find({ productId });
        res.status(200).json(feedbacks);
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

