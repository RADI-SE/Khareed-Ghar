import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  editProduct,
  getUserProducts,
  getSimilarProducts
} from "../../controller/seller/product.controller.js";
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";

const router = express.Router();

const verifySeller = [verifyTokenForRole, AuthorizeRoles("seller")];

router.post("/seller/products", verifySeller, addProduct);

router.get("/seller/getProductsByUserId/:id", getUserProducts);

router.get("/seller/products", getProducts);

router.get("/seller/productsById", getProductById);

router.put("/seller/products/:id", verifySeller,editProduct);

router.delete("/seller/products/:id", verifySeller, deleteProduct);

router.post("/seller/getSimilarProducts", getSimilarProducts);


export default router;
