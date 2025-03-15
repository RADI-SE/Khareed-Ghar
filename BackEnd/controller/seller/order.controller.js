import { Order } from "../../model/order.model.js";
import { Product } from "../../model/product.model.js";
import { UserLocation } from "../../model/location.model.js";
import { Cart } from "../../model/cart.model.js";

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
    const {CART_ID, SHIPPING_ADDRESS_ID } = req.body;
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    const userId = decoded.userId;
    console.log("USER_ID",USER_ID, "CART_ID",CART_ID, "SHIPPING_ADDRESS_ID",SHIPPING_ADDRESS_ID);
    const cart = await Cart.findById(CART_ID);
    const shippingAddress = await UserLocation.findById(SHIPPING_ADDRESS_ID);
    console.log("cart",cart);
    console.log("shippingAddress",shippingAddress);
    if (!cart || !shippingAddress) {
        return res.status(404).json({ error: "Cart or shipping address not found" });
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
      paymentMethod: "COD",
      status: "Pending",
    })
    await Cart.findByIdAndDelete(CART_ID);
    res.status(201).json(order); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getOrders = async (req, res) => {
    const orders = await Order.find({ seller: req.user._id });
    res.status(200).json(orders);
}

