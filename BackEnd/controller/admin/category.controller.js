import { Category, Subcategory } from "../../model/category.model.js";
import {Product} from "../../model/product.model.js";


// add category
export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log(name, description);
    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.json({ message: "New category created successfully", newCategory });
  } catch (error) {
    console.error("Error in cresteCagory:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// add subCategory
export const addSubCategory = async (req, res) => {
  try {
    const { name, description, parentCategory } = req.body;
    if (!parentCategory) {
      return res.status(400).json({
        success: false,
        message: "Parent category is required.",
      });
    }
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required.",
      });
    }

    const parentCategoryObj = await Category.findById(parentCategory);
    if (!parentCategoryObj) {
      return res.status(404).json({
        success: false,
        message: "Parent category not found.",
      });
    }
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

    if (!parentCategory) {
      return res
        .status(400)
        .json({ success: false, message: "parentCategory is required" });
    }

    const parentCategoryObj = await Category.findById(parentCategory);
    if (!parentCategoryObj) {
      return res
        .status(404)
        .json({ success: false, message: "Parent category not found" });
    }

    const childs  = parentCategoryObj.subcategories ; 
    console.log("conslone parent object childs  ...","   :",childs)
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
    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    updatedCategory.save();
    res.json({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.error("Error in editCategories:", error);
    res.status(500).json({ success: false, message: "Server error" });
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
    const products = await Product.find({ category: id });
    res.json({ success: true, message: "Products fetched successfully", products });
  } catch (error) {
    console.error("Error in getAllCategoryProducts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};