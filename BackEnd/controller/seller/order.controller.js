import { Order } from "../../model/order.model.js";
import { Product } from "../../model/product.model.js";
import { UserLocation } from "../../model/location.model.js";
import { SellerNotification } from "../../model/seller.notification.model.js";
import { Cart } from "../../model/cart.model.js";
import jwt from "jsonwebtoken";

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
 
    const notifiedSellers = [];

for (const item of cart.items) {
  const product = await Product.findById(item.product);
  if (!product || notifiedSellers.includes(product.seller.toString())) {
    continue;
  }

  const sellerNotification = new SellerNotification({
    receipient: product.seller,
    order: order._id,
    message: `${userId} placed a new order of ${item.quantity} ${product.name}`,
    read: false,
    readAt: null,
    link: `/order/${order._id}`,
  });

  console.log("sellerNotification", sellerNotification);
  await sellerNotification.save();
    notifiedSellers.push(product.seller.toString());
}

    await Cart.findByIdAndDelete(CART_ID);
    res.status(201).json({ message: "Order created successfully", order }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//get all user orders
export const getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
}

//get all orders  
export const getAllOrders = async (req, res) => {
    const orders = await Order.find();
    res.status(200).json(orders);
}


