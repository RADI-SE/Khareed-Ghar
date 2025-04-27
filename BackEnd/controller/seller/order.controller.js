import { Order } from "../../model/order.model.js";
import { Product } from "../../model/product.model.js";
import { UserLocation } from "../../model/location.model.js";
import { Cart } from "../../model/cart.model.js";
import jwt from "jsonwebtoken";
import { SellerNotification } from "../../model/seller.notification.model.js";
import {Auction} from "../../model/auction.model.js"
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
    for(let i=0;i<order.products.length;i++){
      const auction = await Auction.findOne({productId: order.products[i].product});
      if(auction){
        const sellerNotification = new SellerNotification({
        receipient: auction.sellerId,
        product: auction.productId,
        order: order._id,
        message: `You have a new order for product ${auction.productId}`,
        read: false,
        readAt: null,
        link: `/seller/orders/${order._id}`
      });
      await sellerNotification.save();

      const notifySeller = await Product.findById(order.products[i].product);
      if(notifySeller){
        const sellerNotification = new SellerNotification({
          receipient: notifySeller.seller,
          product: notifySeller._id,
          order: order._id,
          message: `You have a new order for product ${notifySeller.name}`,
          read: false,
          readAt: null,
          link: `/seller/orders/${order._id}`
        })
        await sellerNotification.save();
      }
    }
    }
    await Cart.findByIdAndDelete(CART_ID);
    res.status(201).json({ message: "Order created successfully", order }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
}
 
export const getAllOrders = async (req, res) => {
    const orders = await Order.find();
    res.status(200).json(orders);
}


