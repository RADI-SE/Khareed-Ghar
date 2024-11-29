import { Category, Subcategory } from "../../model/category.model.js";
import { User } from "../../model/user.model.js";
import {Product}  from "../../model/product.model.js";

// Create Product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      specifications, 
      price,
      category,
      subcategory,
      seller,
      images,
    } = req.body;
    if (!name || !description || !price || !category || !seller || !subcategory || !specifications || !specifications.condition || !specifications.color || !specifications.capacity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: 'name', 'description', 'price', 'category', 'seller', 'subcategory', or 'specifications.condition', 'specifications.color', 'specifications.capacity'.",
      });
    }

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    const isSubcategoryValid = categoryDoc.subcategories.id(subcategory);
    if (!isSubcategoryValid) {
      return res.status(404).json({
        success: false,
        message: "Selected subcategory does not exist under this category.",
      });
    }

    const subcategoryDoc = await Subcategory.findById(subcategory);
    if (!subcategoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found.",
      });
    }

    const foundSeller = await User.findById(seller);
    if (!foundSeller || foundSeller.role !== "seller") {
      return res.status(404).json({
        success: false,
        message: "Seller not found or invalid seller role.",
      });
    }
    const product = new Product({
      name,
      description,
      specifications,
      price,
      category,
      subcategory,
      seller,
      images,
    });
    const savedProduct = await product.save();

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
    // Fetch all products with populated category, subcategory, and seller data
    const products = await Product.find()
      .populate('category',"name")  // Populate category details (by ID reference)
      .populate('subcategory',"name")  // Populate subcategory details (by ID reference)
      .populate('seller');  // Populate seller details (by ID reference)

    // Check if there are products available
    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found.",
      });
    }

    // Send back the response with the products
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
    const product = await Product.findById(id).populate("category").populate("seller");

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

// Update Product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      specifications,
      price,
      category,
      seller,
      images,
    } = req.body;

    // Update product by ID
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        specifications,
        price,
        category,
        seller,
        images,
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
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
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
