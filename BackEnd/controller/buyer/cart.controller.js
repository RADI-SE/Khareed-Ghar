import mongoose from "mongoose";
import { Cart } from "../../model/cart.model.js";
import { Product } from "../../model/product.model.js";

const createCart = async (user, cart, productId, quantity, res) => {
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
      if (user === "guest") {
        cart.items.push({
          guest: "guest",
          product: productId,
          quantity,
          price: product.price,
          total: product.price * quantity,
        });
      } else {
        cart.items.push({
          user: user,
          product: productId,
          quantity,
          price: product.price,
          total: product.price * quantity,
        });
      }
    }
    cart.totalAmount = cart.items.reduce((acc, item) => acc + item.total, 0);
    const updated = await cart.save();
    return res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addToCart = async (req, res) => {
  const { id, productId, quantity } = req.body;
  console.log(req.body);
  let guestId = req.cookies.guestId || null;

  try {
    let cart;
    if (!id) {
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
      cart = await Cart.findOne({ user: id });
      if (!cart) {
        cart = new Cart({ user: id, items: [], totalAmount: 0 });
      }
    }
    cart = await createCart(id || guestId, cart, productId, quantity);
    return res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
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
  const { id } = req.body;
  const guestId = req.cookies.guestId;
  let cart;
  try {
    if (!id) {
      cart = await Cart.findOne({ _id: guestId }).populate(
        "items.product",
        "name price"
      );
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
    } else {
      let guestCart = await Cart.findOne({ _id: guestId });
      cart = await Cart.findOne({ user: id }).populate(
        "items.product",
        "name price"
      );
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      if (guestCart && guestCart.items.length > 0) {
        guestCart.items.forEach((item) => {
          cart.items.push({
            user: id,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          });
        });
        cart.totalAmount = cart.items.reduce((acc, item) => acc + item.total, 0);
        await cart.save();
        console.log("Success");
        await guestCart.deleteOne();
      }
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const clearCart = async (req, res) => {
  const id = req.body;
  try {
    const cart = await Cart.findOne({ user: id.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error " });
  }
};
