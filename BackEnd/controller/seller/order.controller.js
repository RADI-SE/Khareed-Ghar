import { Order } from "../../model/order.model.js";
import { Product } from "../../model/product.model.js";
import { UserLocation } from "../../model/location.model.js";
import { Cart } from "../../model/cart.model.js";
import jwt from "jsonwebtoken";
import { SellerNotification } from "../../model/seller.notification.model.js";
import {Auction} from "../../model/auction.model.js"
import { User } from "../../model/user.model.js";
import { AdminNotification } from "../../model/admin.notification.model.js";

export const createOrder = async (req, res) => {
  try {
    const token = req.cookies.token;
    const { CART_ID, SHIPPING_ADDRESS_ID, PAYMENT_METHOD } = req.body;

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    const userId = decoded.userId;

    const cart = await Cart.findById(CART_ID);
    if (!cart) {
      return res.status(404).json({ error: "Please add items to your cart before placing your order." });
    }

    const shippingAddress = await UserLocation.findById(SHIPPING_ADDRESS_ID);
    if (!shippingAddress) {
      return res.status(404).json({ error: "Please select a shipping address." });
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
    });
    console.log("test 1 ");
 
    for (const item of order.products) {
      const auction = await Auction.findOne({ productId: item.product });
      let sellerId = null;
      let productName = null;

      if (auction) {
        sellerId = auction.sellerId;
        productName = auction.productId;
      } else {
        const product = await Product.findById(item.product);
        if (product) {
          sellerId = product.seller;
          productName = product.name;
        }
      }
      console.log("test 2 ");

      if (sellerId) {
        const sellerNotification = new SellerNotification({
          receipient: sellerId,
          product: item.product,
          order: order._id,
          message: `You have a new order for product ${productName}`,
          read: false,
          readAt: null,
          link: `/seller/orders/${order._id}`
        });
        await sellerNotification.save();

  
        const findUser = await User.findById(userId);
        const adminNotification = new AdminNotification({
          receipient: "6728e930dc54a1f881e1d0cd",
          product: item.product,
          order: order._id,
          message: `New order placed by ${findUser.name} for product ${productName} seller id ${sellerId} status ${order.status}`,
          read: false,
          readAt: null,
          link: `/admin/orders/${order._id}`
        });
        await adminNotification.save();
      }
    }
    console.log("test 3 ");
    
    await Cart.findByIdAndDelete(CART_ID);
    res.status(201).json({ message: "Order created successfully", order });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getUserOrders = async (req, res) => {
  try {
    const token = req.cookies.token;
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    const userId = decoded.userId;
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ error: "User not found." });
    }
    if(user.role !== "seller"){
      return res.status(403).json({ error: "Unauthorized" });
    }
    const product = await Product.find({ seller: userId });
    if(!product){
      return res.status(404).json({ error: "No products found." });
    }
    const productIds = product.map(p => p._id);

    const orders = await Order.find({ "products.product": { $in: productIds } });
    if(!orders){
      return res.status(404).json({ error: "No orders found." });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 
 
export const getAllOrders = async (req, res) => {
    const orders = await Order.find();
    res.status(200).json(orders);
}


