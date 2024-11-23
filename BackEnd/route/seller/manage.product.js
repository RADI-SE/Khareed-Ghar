import express from "express";
import { addProduct, getProducts, getProductById, deleteProduct } from "../../controller/seller/product.controller.js"
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";

const router = express.Router();

const verifySeller = [verifyTokenForRole, AuthorizeRoles('seller')];

router.post("/seller/products", verifySeller, addProduct);
 
router.get("/seller/products", verifySeller, getProducts);
 
router.get("/seller/products/:id", verifySeller, getProductById);
 
router.delete("/seller/products/:id", verifySeller, deleteProduct);


export default router;
