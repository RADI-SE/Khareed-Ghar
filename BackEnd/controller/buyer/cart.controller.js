import mongoose from "mongoose";
import { Cart } from "../../model/cart.model.js";
import { Product } from "../../model/product.model.js";
import jwt from "jsonwebtoken";

const createCart = async (user,guestId, cart, productId, quantity, res) => {
  let a;
  if(user){
    guestId = undefined;
  }else{
    a = guestId 
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
      if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
        cart.items.push({
          user: user || null,  
          guest: a ? guestId : undefined, 
          product: productId,
          quantity,
          price: product.price,
          total: product.price * quantity,
        });
      
    }
    cart.totalAmount = cart.items.reduce((acc, item) => acc + item.total, 0);
    const updated = await cart.save();
   
    return updated;
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const token = req.cookies.token;
  let userId ;
  let guestId = req.cookies.guestId || null;
 
  
  try {
    let cart;
    if (!token) {
      if (!guestId) {
        guestId = new mongoose.Types.ObjectId().toString();
        res.cookie("guestId", guestId, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }
      cart = await Cart.findOne({ _id: guestId });
      if (!cart) {
        cart = new Cart({ _id: guestId, items: [], totalAmount: 0 });
      }
    } else {
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
      }
      userId = decoded.userId;
      cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, items: [], totalAmount: 0 });
      }
    }
 

    cart = await createCart(userId , guestId, cart, productId, quantity);
    return res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  const token = req.cookies.token;
  const guestId = req.cookies.guestId;
  let cart ;
  const { productId } = req.body;
  try {
    if(!token){
      cart = await Cart.findOne({_id: guestId})
      if( cart && cart.items.length <= 1 ){
        cart = await Cart.deleteOne()
      }
      if(!cart){
        return res.status(404).json({ message: "Cart not found" });
      }
    }else{
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
      }
      const userId = decoded.userId;
      cart = await Cart.findOne({ user: userId });
      if( cart && cart.items.length <= 1 ){
        cart = await Cart.deleteOne()
      }
       if (!cart) {
         return res.status(404).json({ message: "Cart not found" });
       }
    }
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    cart.totalAmount = cart.items.reduce((acc, item) => acc + item.total, 0);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getCart = async (req, res) => {
  try {
    const token = req.cookies.token;
    const guestId = req.cookies.guestId;
    let cart;
    if (!token) {
      cart = await Cart.findOne({ _id: guestId }).populate(
        "items.product",
        "name price"
      );
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
    } else {
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
      }
      const userId = decoded.userId;
      const guestCart = await Cart.findOne({ _id: guestId });
      cart = await Cart.findOne({ user: userId }).populate(
        "items.product",
        "name price"
      );

      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }
      if (guestCart && guestCart.items.length > 0) {
        guestCart.items.forEach((item) => {
          cart.items.push({
            user: userId,
            guest: undefined || null,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          });
        });

        cart.totalAmount = cart.items.reduce(
          (acc, item) => acc + item.total,
          0
        );
      }
      await cart.save();
      if (guestCart) {
        await guestCart.deleteOne();
      }
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const clearCart = async (req, res) => {
  try { 
    const token = req.cookies.token;
    const guestId = req.cookies.guestId;
    let cart;

    if (!token) {
      cart = await Cart.findOne({ _id: guestId });
      if (cart) {
        await Cart.deleteOne({ _id: guestId }); 
      }
     
    } else {
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
      }

      const userId = decoded.userId;
      cart = await Cart.findOne({ user: userId });
      if (cart) {
        await Cart.deleteOne({ _id: cart._id }); 
      }
 
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};

