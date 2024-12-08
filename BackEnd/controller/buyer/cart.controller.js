import {Cart} from "../../model/cart.model.js"; 
import {Product} from "../../model/product.model.js";

export const addToCart = async (req, res) => {
  const { id, productId, quantity } = req.body; 
  try {
    let cart = await Cart.findOne({ user: id });

    if (!cart) {
      cart = new Cart({
        user: id,
        items: [],
        totalAmount: 0,
      });
    }

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
      const newItem = {
        product: productId,
        quantity,
        price: product.price,
        total: product.price * quantity,
      };
      cart.items.push(newItem);
    }

    cart.totalAmount = cart.items.reduce((acc, item) => acc + item.total, 0);

    // Save the cart
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  const {id} = req.params;
  const { productId } = req.body; 

  console.log("Removing: ", id, productId);
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
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getCart = async (req, res) => {
  const {id} = req.params;
  try {
    const cart = await Cart.findOne({ user: id }).populate(
      "items.product",
      "name price"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const clearCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalAmount = 0;
    
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
