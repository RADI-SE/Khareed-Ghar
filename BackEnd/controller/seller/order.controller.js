import { Order } from "../../model/order.model.js";
import { Product } from "../../model/product.model.js";
import { UserLocation } from "../../model/location.model.js";
import { Cart } from "../../model/cart.model.js";
import jwt from "jsonwebtoken";
/*
 "user": "64f8e4b2c9b1a3d2e8f1a2b3", // Sample ObjectId for a user
  "products": [
    {
      "product": "64f8e4b2c9b1a3d2e8f1a2b4", // Sample ObjectId for a product
      "quantity": 2,
      "price": 29.99
    },
    {
      "product": "64f8e4b2c9b1a3d2e8f1a2b5", // Sample ObjectId for another product
      "quantity": 1,
      "price": 49.99
    }
  ],
  "totalAmount": 109.97, // Updated total amount
  "status": "Processing", // Updated status
  "paymentMethod": "Credit Card", // Updated payment method
  "shippingAddress": "64f8e4b2c9b1a3d2e8f1a2b6", // Sample ObjectId for shipping address

*/
export const createOrder = async (req, res) => {
  try {
    const token = req.cookies.token;
    const {CART_ID, SHIPPING_ADDRESS_ID, PAYMENT_METHOD } = req.body;
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    const userId = decoded.userId; 
    const cart = await Cart.findById(CART_ID);
    if(!cart){
      return res.status(404).json({ error: "Please add some items to your cart before placing your order." });
    }
    const shippingAddress = await UserLocation.findById(SHIPPING_ADDRESS_ID);
    if(!shippingAddress){
      return res.status(404).json({ error: "Please select a shipping location before placing your order." });
    }

    const order = await Order.create({
      user: userId,
      products: cart.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: cart.totalAmount,
      shippingAddress: shippingAddress._id,
      paymentMethod: PAYMENT_METHOD,
      status: "Pending",
    })

    await Cart.findByIdAndDelete(CART_ID);
    res.status(201).json({ message: "Order created successfully", order }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getOrders = async (req, res) => {
    const orders = await Order.find({ seller: req.user._id });
    res.status(200).json(orders);
}

