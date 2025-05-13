import express from 'express';
import { addFeedback, updateFeedback, deleteFeedback, getFeedBacksByProductId } from '../controller/feedback.controller.js';
const router = express.Router();

router.post("/add-feedback", addFeedback);

router.put("/:id", updateFeedback);

router.delete("/:id", deleteFeedback);

router.get("/get-product-feedback/:id", getFeedBacksByProductId);

export default router;
