import express from 'express';
import { addFeedback, updateFeedback, deleteFeedback, getFeedbackByProductId } from '../controller/feedback.controller.js';
const router = express.Router();

router.post("/", addFeedback);

router.put("/:id", updateFeedback);

router.delete("/:id", deleteFeedback);

router.get("/product/:productId", getFeedbackByProductId);

export default router;
