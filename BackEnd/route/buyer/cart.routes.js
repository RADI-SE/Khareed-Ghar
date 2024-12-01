import express from 'express';
import { addToCart, removeFromCart, getCart, clearCart } from '../../controller/buyer/cart.controller.js';
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";

const router = express.Router();
const verifyBuyer = [verifyTokenForRole, AuthorizeRoles('buyer')];

router.post('/add-to-cart', verifyBuyer, addToCart);
 
router.post('/remove', verifyBuyer, removeFromCart);
 
router.get('/', verifyBuyer, getCart);
 
router.delete('/clear', verifyBuyer, clearCart);

export default router;
