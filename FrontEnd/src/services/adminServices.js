// src/services/authService.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/";

axios.defaults.withCredentials = true;

export const useAdminService = create((set) => ({
  categories: null,
  isAuthenticated: false,
  isLoading: false,
  errorMessage: null,
  setError: (message) => set({ errorMessage: message }),
  clearError: () => set({ errorMessage: null }),

  AddCategoriesForm: async (token, name, description) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.post(
        `${API_URL}add-category`,
        { name: name, description: description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        set({
          isLoading: false,
          errorMessage: null,
        });
      } else {
        set({ isLoading: false, errorMessage: response.data.message });
      }
      set({ isLoading: false, errorMessage: null });
    } catch (error) {}
  },

  AddSubCategoriesForm: async (token, name, description, parentCategory) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.post(
        `${API_URL}add-Subcategory`,
        {
          name: name,
          description: description,
          parentCategory: parentCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        set({
          isLoading: false,
          errorMessage: null,
        });
      } else {
        set({ isLoading: false, errorMessage: response.data.message });
      }
      set({ isLoading: false, errorMessage: null });
    } catch (error) {}
  },

  EditSubCategoriesForm: async (
    token,
    subCategoryId,
    id,
    name,
    description
  ) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.put(
        `${API_URL}edit-subcategory`,
        {
          subCategoryId: subCategoryId,
          id: id,
          name: name,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        set({
          isLoading: false,
          errorMessage: null,
        });
      } else {
        set({ isLoading: false, errorMessage: response.data.message });
      }
      set({ isLoading: false, errorMessage: null });
    } catch (error) {}
  },

  EditCategoriesForm: async (token, parentCategoryId, name, description) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.put(
        `${API_URL}edit-category/${parentCategoryId}`,
        { name: name, description: description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        set({
          isLoading: false,
          errorMessage: null,
        });
      } else {
        set({ isLoading: false, errorMessage: response.data.message });
      }
      set({ isLoading: false, errorMessage: null });
    } catch (error) {}
  },

  displayCategories: async (token) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.get(
        `${API_URL}view-categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.categories) {
        const categories = response.data.categories;
        set({
          categories: categories,
          isAuthenticated: true,
          isLoading: false,
          isCheckingAuth: false,
        });
        return categories;
      }
    } catch (error) {}
  },

  displaySubCategories: async (token, parentCategoryId) => {
    try {
      set({ isLoading: true, errorMessage: null });

      const response = await axios.get(
        `${API_URL}view-Subcategories/${parentCategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({
        isAuthenticated: true,
        isLoading: false,
        isCheckingAuth: false,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      set({
        isLoading: false,
        errorMessage:
          error?.response?.data?.message || "Failed to fetch subcategories.",
      });
    }
  },

  deleteCategories: async (token, name, categoryId) => {
    try {
      console.log("NAME is " + name);
      console.log("ID is " + categoryId);
      set({ isLoading: true, errorMessage: null });
      const response = await axios.delete(
        `${API_URL}delete-category`,
        {
          data: {
            categoryId: categoryId,
            name: name,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        set({
          categories: null,
          isAuthenticated: true,
          isLoading: false,
        });
        console.log("categories deleted successfully");
      }
    } catch (error) {
      console.log(deleteCategories);
      set({ isLoading: false, errorMessage: error.response.data.message });
      throw error;
    }
  },

  deleteSubCategories: async (token, name, categoryId, subcategoryId) => {
    try {
      console.log("NAME is " + name);
      console.log("ID is " + categoryId);
      set({ isLoading: true, errorMessage: null });
      const response = await axios.delete(
        `${API_URL}delete-subcategory`,
        {
          data: {
            categoryId: categoryId,
            name: name,
            subcategoryId: subcategoryId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        set({
          categories: null,
          isAuthenticated: true,
          isLoading: false,
        });
        console.log("categories deleted successfully");
      }
    } catch (error) {
      console.log(deleteCategories);
      set({ isLoading: false, errorMessage: error.response.data.message });
      throw error;
    }
  },
}));
