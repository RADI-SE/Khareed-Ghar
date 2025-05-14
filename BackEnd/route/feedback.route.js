import express from 'express';
import { addFeedback, updateFeedback, deleteFeedback, deleteFeedbackBuyer, getFeedBacksByProductId , getFeedbackByProductId} from '../controller/feedback.controller.js';
const router = express.Router();

router.post("/add-feedback", addFeedback);

router.put("/update-feedback/:feedbackId", updateFeedback);

router.delete("/delete-feedback/:id", deleteFeedback);

router.delete("/delete-buyer-feedback/:feedbackId", deleteFeedbackBuyer);

router.get("/get-product-feedback/:id", getFeedBacksByProductId);

router.get("/get-feedback-by-product-id/:id", getFeedbackByProductId);

export default router;
