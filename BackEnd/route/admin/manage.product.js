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
import { upload } from "../../Utils/multerconfig.js";

const router = express.Router();


const verifySeller = [verifyTokenForRole, AuthorizeRoles("seller")];
const verifyAdminSeller = [verifyTokenForRole, AuthorizeRoles("admin", "seller")];

router.post("/products", upload.single("file"), addProduct);

 
router.get("/products", getProducts);

router.get("/getProductsByUserId/:id", getUserProducts);

router.get("/seller/productsById/:id", getProductById);

router.put("/seller/products/:id", upload.single("file"), verifySeller, editProduct);

router.delete("/seller/products/:id" , verifyAdminSeller, deleteProduct);

router.get("/seller/getSimilarProducts/:id", getSimilarProducts);

export default router;
