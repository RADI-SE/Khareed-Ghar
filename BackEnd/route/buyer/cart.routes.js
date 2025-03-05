import express from 'express';
import { addToCart, removeFromCart, getCart, clearCart } from '../../controller/buyer/cart.controller.js';
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";

const router = express.Router();
const verifyBuyer = [verifyTokenForRole, AuthorizeRoles('buyer')];

router.post('/add-to-cart', addToCart);

router.get('/cart-items', getCart);

router.delete('/remove-from-cart', removeFromCart);

router.delete('/clear', clearCart);

export default router;
