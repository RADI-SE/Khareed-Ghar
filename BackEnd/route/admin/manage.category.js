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
} from "../../controller/admin/category.controller.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";

const router = express.Router();

// Middleware for role-based access
const verifyAdmin = [verifyTokenForRole, AuthorizeRoles("admin")];
const verifyAdminSeller = [verifyTokenForRole, AuthorizeRoles("admin", "seller")];

// Routes for category and subcategory management
router.post("/add-category", verifyAdmin, addCategory);

router.post("/add-subcategory", verifyAdmin, addSubCategory);

router.get("/view-categories", getCategories);

router.get("/view-subcategories/:parentCategory", getSubCategories);

router.put("/edit-category/:id", verifyAdmin, editCategories);

router.put("/edit-subcategory/:parentCategory", verifyAdmin, editSubCategories);

router.delete("/delete-category", verifyAdmin, deleteCategory);

router.delete("/delete-subcategory", deleteSubategory);

export default router;
