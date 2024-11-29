import express from "express";
import { 
  addProduct, 
  getProducts, 
  getProductById, 
  deleteProduct 
} from "../../controller/seller/product.controller.js";
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";

const router = express.Router();


const verifySeller = [verifyTokenForRole, AuthorizeRoles("seller")];
const verifyAdminSeller = [verifyTokenForRole, AuthorizeRoles("admin", "seller")];

router.post("/products", verifySeller, addProduct);

router.get("/products", verifyAdminSeller, getProducts);

router.get("/products/:id", verifyAdminSeller, getProductById);

router.delete("/products/:id", verifyAdminSeller, deleteProduct);

export default router;
