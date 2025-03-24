// src/services/authService.js
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const API_URL = "http://localhost:5000/api/";

axios.defaults.withCredentials = true;

export const useAdminService = create((set) => ({
  categories: null,
  isAuthenticated: false,
  isLoading: false,
  errorMessage: null,
  isError: false,
  setError: (message) => set({ errorMessage: message }),
  clearError: () => set({ errorMessage: null }),


  successMessage: null,
  isSuccess: false,
  setSuccess: (message) => set({ successMessage: message }),
  clearSuccess: () => set({ successMessage: null }),


  AddCategoriesForm: async (token, name, description) => {
    try {
      set({ isLoading: true, errorMessage: null, successMessage:null });

      const response = await axios.post(
        `${API_URL}add-category`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.status === 200) {
        set({
          isLoading: false,
          isSuccess: true,
          successMessage: "New category created successfully",
        });
        toast.success(response.data.message);
        return response.data;
      } 
 
    } catch (error) {
    
      set({
        isLoading: false,isError:true , 
        errorMessage: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
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
      if (response.status === 201) {
        set({
          isLoading: false,
          isSuccess: true,
          successMessage: "New Subcategory created successfully",
        });
        toast.success(response.data.message);
        return response.data;
      } 
 
    } catch (error) {
      set({
        isLoading: false,isError:true , 
        errorMessage: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  },

  EditSubCategoriesForm: async (
    token,
    subCategoryId,
    parentCategory,
    name,
    description
  ) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.put(
        `${API_URL}edit-subcategory/${parentCategory}`,
        {
          subCategoryId: subCategoryId,
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
        toast.success(response.data.message);
      }
      console.log("console data for sub edit ", response.data.subcategory);
      return response.data.subcategory;
    } catch (error) {
      set({ isLoading: false, errorMessage: error.message });
      toast.error(error.response?.data?.message);
      return null;
    }
  },

  EditCategoriesForm: async (token, parentCategoryId, name, description) => {
    try {
      set({ isLoading: true, errorMessage: null, successMessage: null });
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
          isSuccess: true,
          successMessage: response.data.message,
        });
        toast.success(response.data.message);
        return response.data;
      }
      
    } catch (error) {
      set({ 
        isLoading: false, 
        isError: true, 
        errorMessage: error.response?.data?.message || "Failed to edit category" 
      });
      toast.error(error.response?.data?.message || "Failed to edit category");
      throw error;
    }
  },

  displayCategories: async () => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.get(`${API_URL}view-categories`, {
      });
      if (response.data && response.data.categories) {
        const categories = response.data.categories;
        set({
          isLoading: false,
          isSuccess: true,
          successMessage: "Categories fetched successfully",
        });
        return categories;
      }
      // Unable to connect to the database server. Please try again later
    } catch (error) {  
      set({
        isLoading: false,isError:true , 
        errorMessage: "Unable to connect to the database server. Please try again later",
      });
      toast.error("Unable to connect to the database server. Please try again later");
    }
  },

  getSubCategories: async (token, parentCategoryId) => {
    try {
      set({ isLoading: true, errorMessage: null });

      const response = await axios.get(
        `${API_URL}view-subcategories/${parentCategoryId}`,
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
      console.log(response.data.childs);

      return response.data.childs;
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      set({
        isLoading: false,
        errorMessage:
          error?.response?.data?.message || "Failed to fetch subcategories.",
      });
      toast.error(error?.response?.data?.message || "Failed to fetch subcategories");
    }
  },
 
  deleteCategories: async (token, name, categoryId) => {
    try {
      console.log("NAME is: ", name);
      console.log("ID is: ", categoryId);

      set({ isLoading: true, errorMessage: null });

      const response = await axios.delete(`${API_URL}delete-category`, {
        data: {
          categoryId,
          name,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data)
      if (response.data.success) {
        set({
          categories: null,
          isAuthenticated: true,
          isLoading: false,
        });
        toast.success(response.data.message);
      } else {
        set({
          isLoading: false,
          errorMessage: response.data.message || "Failed to delete category.",
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error in deleteCategories: ", error);
      set({
        isLoading: false,
        errorMessage: error.response?.data?.message || "An error occurred.",
      });
      toast.error(error.response?.data?.message);
      throw error;
    }
  },

  deleteSubCategories: async (token, categoryId, subcategoryId) => {
    try {
      console.log("Category ID is " + categoryId);
      console.log("Subcategory ID is " + subcategoryId);

      // Make sure to check if categoryId and subcategoryId are valid
      if (!categoryId || !subcategoryId) {
        console.log("Missing categoryId or subcategoryId");
        return;
      }

      set({ isLoading: true, errorMessage: null });

      // Assuming API_URL is properly set
      const response = await axios.delete(`${API_URL}delete-subcategory`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure you're sending the token for authorization
        },
        data: {
          categoryId,
          subcategoryId,
        },
      });
      if (response.data.success) {
        set({
          categories: null, 
          isAuthenticated: true,
          isLoading: false,
        });
        toast.success(response.data.message);
      } else {
        console.log("Failed to delete subcategory");
      }
    } catch (error) {
      
      console.error("Error deleting subcategory", error);
 
      if (error.response) {
        console.log("Error Response Data: ", error.response.data);
        set({ isLoading: false, errorMessage: error.response.data.message });
        toast.error(error.response.data.message || "Failed to delete subcategory");
      } else {
        set({
          isLoading: false,
          errorMessage: "An error occurred while deleting.",
        });
        toast.error(error.response.data.message);
      }

      throw error;
    }
  },

  getAllCategoryProducts: async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/get-products-by-category/${id.selectedCategory}`,
      );
      return response.data.products;
    } catch (error) {
      console.error("Error fetching products for category:", error);
      toast.error("Failed to fetch products for category");
      return { products: [], message: "Failed to fetch products." }; 
    }
  },  

  getCategoryById: async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/get-category-byId/${id.selectedCategory}`,
      );
      return response.data.category;
    } catch (error) {
      console.error("Error fetching category:", error);
      toast.error("Failed to fetch category");
      return { category: null, message: "Failed to fetch category." }; 
    }
  },
  
})); 