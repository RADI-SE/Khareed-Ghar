import { Category, Subcategory } from "../../model/category.model.js";
import {Product} from "../../model/product.model.js";
import { validationResult } from 'express-validator';

// add category
export const addCategory = async (req, res) => {
  try {
 
    const { name, description } = req.body;
    const check = await  Category.findOne({ name: name});
    if (check) {
      return res.status(400).json({success: false ,  message: "Category already exists" });
    }
    const newCategory = new Category({ name, description });

    await newCategory.save();
    res.json({success: true ,  message: "New category created successfully" });
  } catch (error) { 
    res.status(500).json({ success: false, message: "Server error 2 " });
  }
};

// add subCategory
export const addSubCategory = async (req, res) => {
  try {
    const { name, description, parentCategory } = req.body;
    const check = await Subcategory.findOne({ name: name, parentCategory: parentCategory });
    if (check) {
      return res.status(400).json({ success: false, message: "Subcategory already exists" });
    }
    const parentCategoryObj = await Category.findById(parentCategory);
    const newSubCategory = new Subcategory({
      name,
      description,
      parentCategory,
    });
    const savedSubCategory = await newSubCategory.save();

    parentCategoryObj.subcategories.push(savedSubCategory);
    await parentCategoryObj.save();

    return res.status(201).json({
      success: true,
      message: "New subcategory created successfully.",
      subcategory: savedSubCategory,
    });
  } catch (error) {
    console.error("Error in createSubCategory:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// getAllcategories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
//get all sub categories
export const getSubCategories = async (req, res) => {
  try {
    const { parentCategory } = req.params;
  
    const parentCategoryObj = await Category.findById(parentCategory);


    const childs  = parentCategoryObj.subcategories ; 
    res.json({
      success: true,
      message: "Subcategories fetched successfully",
      childs , 
    });
  } catch (error) {
    console.error("Error in getAllSubCategories:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// editCategories
export const editCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validate category ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
        showToast: true
      });
    }

    // Check if category exists
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        showToast: true
      });
    }

    // Validate name
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
        showToast: true
      });
    }

    // Check for duplicate name
    const duplicateCategory = await Category.findOne({ 
      name: name,
      _id: { $ne: id } // Exclude current category
    });
    if (duplicateCategory) {
      return res.status(400).json({
        success: false,
        message: "A category with this name already exists",
        showToast: true
      });
    }

    // Validate description
    if (!description || description.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Category description is required",
        showToast: true
      });
    }

    // Update category
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(500).json({
        success: false,
        message: "Failed to update category",
        showToast: true
      });
    }

    return res.json({
      success: true,
      message: "Category updated successfully",
      showToast: true,
      updatedCategory
    });
  } catch (error) {
    console.error("Error in editCategories:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred while updating category",
      showToast: true
    });
  }
};

// editSubCategories
export const editSubCategories = async (req, res) => {
  try {
    const { parentCategory } = req.params;
    const { subCategoryId,  name, description } = req.body;
    const category = await Category.findById(parentCategory);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Parent category not found.",
      });
    }

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required.",
      });
    }

    const subCategory = category.subcategories.id(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found within the parent category.",
      });
    }
    subCategory.name = name;
    subCategory.description = description;
    await category.save();
    res.json({
      success: true,
      message: "Subcategory updated successfully.",
      subcategory: subCategory,
    });
  } catch (error) {
    console.error("Error in editSubCategories:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// deleteCategories

export const deleteCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const deletedCategory = await Category.findById(categoryId);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    if (name !== deletedCategory.name) {
      return res.status(400).json({ success: false, message: "Name mismatch" });
    }

    await Product.deleteMany({ category: categoryId });
    await Category.findByIdAndDelete(categoryId);
    console.log(
      "Category and associated products deleted successfully: ",
      deletedCategory
    );

    return res.json({
      success: true,
      message: "Category and associated products deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteSubategory = async (req, res) => {
  try {
 
    const {categoryId, subcategoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    
    const child = category.subcategories;
    const subCategoryIndex = child.findIndex(sub => sub.id === subcategoryId);
    
    if (subCategoryIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found within the parent category" });
    }
    
    // Remove the subcategory from the array
    child.splice(subCategoryIndex, 1);
    
    // Save the updated category
    await category.save();

    // Delete the associated products for the subcategory
    await Product.deleteMany({ subCategory: subcategoryId });

    // Delete the subcategory itself
    const deletedSubcategory = await Subcategory.findByIdAndDelete(subcategoryId);
    if (!deletedSubcategory) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found in database" });
    }

    console.log("Subcategory and associated products deleted successfully");
    res.json({
      success: true,
      message: "Subcategory and associated products deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteSubcategory:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get all category product
export const getAllCategoryProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    const products = await Product.find({ category: id, isAuction: false });
    res.json({ success: true, message: "Products fetched successfully", products });
  } catch (error) {
    console.error("Error in getAllCategoryProducts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// search categoryById

export const searchCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, message: "Category fetched successfully", category });
  } catch (error) {
    console.error("Error in searchCategoryById:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};