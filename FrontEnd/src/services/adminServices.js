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

      return response.data.childs;
    } catch (error) {
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
      set({
        isLoading: false,
        errorMessage: error.response?.data?.message || "Failed to delete category.",
      });
      toast.error(error.response?.data?.message || "Failed to delete category.");
    }
  },

  deleteSubCategories: async (token, categoryId, subcategoryId) => {
    try {

      // Make sure to check if categoryId and subcategoryId are valid
      if (!categoryId || !subcategoryId) {
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
      }
    } catch (error) {
      
      if (error.response) {
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
      // 674f9d1ca625626a2353c342
      const response = await axios.get(
        `http://localhost:5000/api/get-products-by-category/${id}`,
      );
      return response.data.products;
    } catch (error) {
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
      toast.error("Failed to fetch category");
      return { category: null, message: "Failed to fetch category." }; 
    }
  },

  fetchCarousels: async () => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.get(`${API_URL}carousel`);
      set({ isLoading: false });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      set({ 
        isLoading: false, 
        isError: true, 
        errorMessage: error.response?.data?.message || "Failed to fetch carousels" 
      });
      toast.error(error.response?.data?.message || "Failed to fetch carousels");
      return [];
    }
  },

  uploadCarousel: async (image, title) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);

      const response = await axios.post(`${API_URL}carousel`, formData);
      set({ 
        isLoading: false, 
        isSuccess: true, 
        successMessage: "Carousel uploaded successfully" 
      });
      toast.success("Carousel uploaded successfully");
      return response.data;
    } catch (error) {
      set({ 
        isLoading: false, 
        isError: true, 
        errorMessage: error.response?.data?.message || "Failed to upload carousel" 
      });
      toast.error(error.response?.data?.message || "Failed to upload carousel");
      throw error;
    }
  },

  deleteCarousel: async (id) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.delete(`${API_URL}carousel/${id}`);
      set({ 
        isLoading: false, 
        isSuccess: true, 
        successMessage: "Carousel deleted successfully" 
      });
      toast.success("Carousel deleted successfully");
      return response.data;
    } catch (error) {
      set({ 
        isLoading: false, 
        isError: true, 
        errorMessage: error.response?.data?.message || "Failed to delete carousel" 
      });
      toast.error(error.response?.data?.message || "Failed to delete carousel");
      throw error;
    }
  },

  updateCarousel: async (id, title, image) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const formData = new FormData();
      formData.append("title", title);
      if (image) formData.append("image", image);

      const response = await axios.put(`${API_URL}carousel/${id}`, formData);
      set({ 
        isLoading: false, 
        isSuccess: true, 
        successMessage: "Carousel updated successfully" 
      });
      toast.success("Carousel updated successfully");
      return response.data;
    } catch (error) {
      set({ 
        isLoading: false, 
        isError: true, 
        errorMessage: error.response?.data?.message || "Failed to update carousel" 
      });
      toast.error(error.response?.data?.message || "Failed to update carousel");
      throw error;
    }
  },

  getUserProfile: async (id) => {  
    try {
      console.log("Fetching user profile for ID:", id); // Debugging line
      set({ isLoading: true, errorMessage: null });
      const response = await axios.get(`http://localhost:5000/api/auth/profile/${id}`);
      console.log("User profile response:", response.data); // Debugging line
      if(response.status !== 200) {
        throw new Error("Failed to fetch user profile");
      }else
      {
        return response.data;
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch user profile");
    }
  },

  getAdminNotifications: async () => {
    try {
       set({ isLoading: true, errorMessage: null });
      const response = await axios.get(`${API_URL}admin-notifications`);
     if(response.status === 200){
       set({ isLoading: false });
       return response.data;
     }
    } catch (error) {
      console.error("Error fetching admin notifications:", error);
      set({ isLoading: false, isError: true, errorMessage: error?.response?.data?.message || "Failed to fetch admin notifications" });
      toast.error(error?.response?.data?.message || "Failed to fetch admin notifications");
    }
  },
  updateAdminNotification: async (id, read) => {
    try {
      const response = await axios.put(`${API_URL}admin-notifications/${id}`, { read });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update admin notification");
    }
  },
  updateUserRole: async (id, role) => {
    try {
      const response = await axios.put(`${API_URL}update-user-role/${id}`, { role });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update user role");
    }
  },
  
}));