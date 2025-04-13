import { Order } from "../../model/order.model.js";
import { Product } from "../../model/product.model.js";
import { UserLocation } from "../../model/location.model.js";
import { SellerNotification } from "../../model/seller.notification.model.js";

import { Cart } from "../../model/cart.model.js";
import jwt from "jsonwebtoken";


/*

cart {
  _id: new ObjectId('67f90b7eac7547938446aa6d'),       
  user: new ObjectId('67322fc629f3c194f356342a'),      
  items: [
    {
      product: new ObjectId('67f235c057f863c01b273b6c'),
      quantity: 1,
      price: 90000,
      total: 90000,
      _id: new ObjectId('67f90b88ac7547938446aaa3')    
    }
  ],
  totalAmount: 90000,
  createdAt: 2025-04-11T12:30:54.105Z,
  updatedAt: 2025-04-11T12:31:04.858Z,
  __v: 1
}
shippingAddress {
  _id: new ObjectId('67e3f8833bada1d4601a4d84'),       
  userName: 'seller',
  street: 'xx',
  state: new ObjectId('67ddd4b5a725505eec03dc33'),     
  city: new ObjectId('67ddd4b5a725505eec03dc33'),      
  phoneNumber: '00000000',
  createdBy: new ObjectId('67322fc629f3c194f356342a'), 
  createdAt: 2025-03-26T12:52:19.791Z,
  __v: 0
}




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
    const product = await Product.findById(cart.items[0].product);
    if(!product){
      return res.status(404).json({ error: "Product not found." });
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


