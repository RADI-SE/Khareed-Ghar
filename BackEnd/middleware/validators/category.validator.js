// validators/category.validator.js
import { body, param, validationResult } from 'express-validator';
 
export const addCategoryValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
];
 
export const addSubCategoryValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('parentCategory').notEmpty().withMessage('Parent category is required'),
];
 
export const editCategoryValidation = [
  param('id').notEmpty().withMessage('Category ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
];
 
export const editSubCategoryValidation = [
  param('parentCategory').notEmpty().withMessage('Parent category ID is required'),
  body('subCategoryId').notEmpty().withMessage('Subcategory ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
];
 
export const deleteCategoryValidation = [
  body('categoryId').notEmpty().withMessage('Category ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
];
 
export const deleteSubCategoryValidation = [
  body('categoryId').notEmpty().withMessage('Category ID is required'),
  body('subcategoryId').notEmpty().withMessage('Subcategory ID is required'),
];
 
export const getSubCategoriesValidation = [
  param('parentCategory').notEmpty().withMessage('Parent category ID is required'),
];
 
export const getAllCategoryProductsValidation = [
  param('id').notEmpty().withMessage('Category ID is required'),
];
 
export const searchCategoryByIdValidation = [
  param('id').notEmpty().withMessage('Category ID is required'),
];
 
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};