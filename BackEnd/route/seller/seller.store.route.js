import express from "express";
import { getSellerStore ,
    createSellerStore
} from "../../controller/seller/seller.store.controller.js";
const router = express.Router();

router.get("/seller-store/:id", getSellerStore);
router.post("/create-seller-store", createSellerStore);
export default router;

