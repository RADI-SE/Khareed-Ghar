import express from "express";
import {
  addCategory,
  addSubCategory,
  getCategories,
  getSubCategories,
  editCategories,
  editSubCategories,
  deleteCategory,
  deleteSubategory,
  getAllCategoryProducts,
  searchCategoryById,
} from "../../controller/admin/category.controller.js";
import  {
  addCategoryValidation,
  addSubCategoryValidation,
  editCategoryValidation,
  editSubCategoryValidation,
  deleteCategoryValidation,
  deleteSubCategoryValidation,
  getSubCategoriesValidation,
  getAllCategoryProductsValidation,
  searchCategoryByIdValidation,
  validate,
} from "../../middleware/validators/category.validator.js"
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";

const router = express.Router();

// Middleware for role-based access
const verifyAdmin = [verifyTokenForRole, AuthorizeRoles("admin")];
const verifyAdminSeller = [verifyTokenForRole, AuthorizeRoles("admin", "seller")];

// Routes for category and subcategory management
router.post("/add-category",addCategoryValidation,validate, verifyAdmin, addCategory);

router.post("/add-subcategory",addSubCategoryValidation,validate,  verifyAdmin, addSubCategory);

router.get("/view-categories",getAllCategoryProductsValidation,validate, getCategories);

router.get("/get-category-byId/:id",searchCategoryByIdValidation,validate, searchCategoryById);

router.get("/get-products-by-category/:id", getAllCategoryProducts);

router.get("/view-subcategories/:parentCategory",getSubCategoriesValidation,validate, getSubCategories);

router.put("/edit-category/:id",editCategoryValidation,validate, verifyAdmin, editCategories);

router.put("/edit-subcategory/:parentCategory",editSubCategoryValidation,validate, verifyAdmin, editSubCategories);

router.delete("/delete-category",deleteCategoryValidation,validate, verifyAdmin, deleteCategory);

router.delete("/delete-subcategory",deleteSubCategoryValidation,validate, deleteSubategory);

export default router;
