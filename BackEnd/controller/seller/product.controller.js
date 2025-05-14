import jwt from "jsonwebtoken";
import { Category } from "../../model/category.model.js";
import { Product } from "../../model/product.model.js";
import axios from "axios";
import { AdminNotification } from "../../model/admin.notification.model.js";
import { User } from "../../model/user.model.js";
export const addProduct = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const specifications = req.body.specifications
      ? JSON.parse(req.body.specifications)
      : {};

    const { name, description, price, category, subcategory, seller, isAuction, isConsigned, consigneeId } =
      req.body;

    const file = req.file; 
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }
    const relativePath = file.path.replace(/\\/g, "/").split("uploads")[1];
    const imagePath = `/uploads${relativePath}`;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please provide a product name.",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Please provide a product description.",
      });
    }

    if (!specifications.condition) {
      return res.status(400).json({
        success: false,
        message: "Please select a product condition.",
      });
    }

    if (!specifications.color) {
      return res.status(400).json({
        success: false,
        message: "Please select a color.",
      });
    }

    if (!specifications.capacity) {
      return res.status(400).json({
        success: false,
        message: "Please select a storage capacity.",
      });
    }

    if (!price) {
      return res.status(400).json({
        success: false,
        message: "Please provide a product price.",
      });
    }

    if (price < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid price. Price cannot be negative.",
      });
    }
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    const product = new Product({
      name,
      description,
      specifications,
      price,
      category,
      subcategory,
      seller: userId,
      isAuction,
      isConsigned,
      consigneeId,
      images: imagePath,
    });
    const savedProduct = await product.save();
    const findUser = await User.findById(userId);
  
    const adminNotification = new AdminNotification({
      receipient: "6728e930dc54a1f881e1d0cd",
      product: product._id,
      message: `New product added by ${findUser.name} seller id ${userId}`,
      read: false,
      readAt: null,
      link: `/admin/products/${product._id}`
    });
    await adminNotification.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error.message || error,
    });
  }
};
export const getProducts = async (req, res) => {
  try {
    
    const products = await Product.find({isAuction: false})
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate({ path: "seller", select: "name" });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found.",
      });
    }
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("category")
      .populate("seller");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// get user products
export const getUserProducts = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const { id } = req.params;
    const products = await Product.find({ seller: userId, isAuction: false })
     .populate("category")
     .populate("subcategory");

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found.",
      });
    }
 
     res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error getting user products:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Update Product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      specifications,
      price,
    } = req.body;

    console.log("req.body",req.body);
    console.log("req.file",req.file);
    
    const file = req.file; 
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }
    const relativePath = file.path.replace(/\\/g, "/").split("uploads")[1];
    const imagePath = `/uploads${relativePath}`;

    console.log("imagePath",imagePath);
    
    // Update product by ID
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        specifications,
        price,
        images: imagePath,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const deletedProduct = await Product.findById(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Confirm Product name is required.",
      });
    }
    if (name != deletedProduct.name) {
      return res.status(400).json({
        success: false,
        message: "Invalid product name provided.",
      });
    }
    await deletedProduct.deleteOne();
    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};


export const getSimilarProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    const otherProducts = await Product.find({
      _id: { $ne: id },
      category: product.category,
      subcategory: product.subcategory,
      isAuction: false,
    }).limit(20); // limit context size
  
    const prompt = `
You are an AI assistant helping to find similar products.

Here is the selected product:
---
Title: ${product.name}
Description: ${product.description}
Category: ${product.category}
Subcategory: ${product.subcategory}
---

Here are some other products:
${otherProducts.map((p, i) =>
  `(${i + 1}) Title: ${p.name} | Description: ${p.description} | Id: ${p._id}`
).join('\n')}

Recommend the 5 most similar products based on title and description.

Return ONLY the product Ids, one per line, with no bullet points, no extra text, and no formatting — just like this:

6802ba4db60d654741244e05
6802ba4db60d654741244e06
6802ba4db60d654741244e07
6802ba4db60d654741244e08
6802ba4db60d654741244e09
`;

    const aiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );
  

    const aiText = aiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const matchedTitles = aiText
    .split("\n")
    .map(line => line.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);

    const similarProducts = await Product.find({
      _id: { $in: matchedTitles },
      isAuction: false,
    });

    console.log("similarProducts",similarProducts);

    return res.status(200).json({ success: true, similarProducts });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
