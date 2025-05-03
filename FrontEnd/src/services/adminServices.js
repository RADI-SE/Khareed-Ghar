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
        errorMessage: error.response?.data?.message || "An error occurred.",
      });
      toast.error(error.response?.data?.message);
      throw error;
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

  /*
  {
    "success": true,
    "user": {
        "_id": "67322fc629f3c194f356342a",
        "name": "seller",
        "email": "seller@1.com",
        "role": "seller",
        "isVerified": true,
        "isBanned": false,
        "isAgreeToTerms": true,
        "lastLogin": "2025-05-03T09:50:27.668Z",
        "__v": 0,
        "originalRole": "seller"
    },
    "products": [
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Black",
                "condition": "Used"
            },
            "_id": "6804d8cb13a2382a11b3f1e0",
            "name": "iPhone 12",
            "description": "Gently used iPhone 12 with box and charger. No cracks or major scratches.",
            "price": 429,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "680396ea22cfe38489ffdd4b",
                "name": "IPhones"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:21:47.638Z",
            "updatedAt": "2025-04-20T11:21:47.638Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Black",
                "condition": "Used"
            },
            "_id": "6804d8cb13a2382a11b3f1e2",
            "name": "iPhone 14",
            "description": "Gently used iPhone 12 with box and charger. No cracks or major scratches.",
            "price": 429,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "680396ea22cfe38489ffdd4b",
                "name": "IPhones"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:21:47.840Z",
            "updatedAt": "2025-04-20T11:21:47.840Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Black",
                "condition": "Used"
            },
            "_id": "6804d8cc13a2382a11b3f1e4",
            "name": "iPhone 15",
            "description": "Gently used iPhone 12 with box and charger. No cracks or major scratches.",
            "price": 429,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "680396ea22cfe38489ffdd4b",
                "name": "IPhones"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:21:48.051Z",
            "updatedAt": "2025-04-20T11:21:48.051Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "128GB",
                "color": "Pine Green",
                "condition": "Used"
            },
            "_id": "6804d8cc13a2382a11b3f1e6",
            "name": "OnePlus 9 Pro",
            "description": "Used OnePlus 9 Pro with high performance and great battery. Charger included.",
            "price": 399,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "6803978622cfe38489ffdedb",
                "name": "Samsung"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:21:48.259Z",
            "updatedAt": "2025-04-20T11:21:48.259Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Black",
                "condition": "Used"
            },
            "_id": "6804d8cc13a2382a11b3f1e8",
            "name": "iPhone 16",
            "description": "Gently used iPhone 12 with box and charger. No cracks or major scratches.",
            "price": 429,
            "isAuction": false,
            "category": null,
            "subcategory": null,
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:21:48.466Z",
            "updatedAt": "2025-04-20T11:21:48.466Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "128GB",
                "color": "Stormy Black",
                "condition": "New"
            },
            "_id": "6804d8cc13a2382a11b3f1ea",
            "name": "Google Pixel 6",
            "description": "Factory-unlocked Pixel 6 in perfect condition. Works with all networks.",
            "price": 449,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "6803978622cfe38489ffdedb",
                "name": "Samsung"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:21:48.765Z",
            "updatedAt": "2025-04-20T11:21:48.765Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Speed Blue",
                "condition": "Used"
            },
            "_id": "6804d8cc13a2382a11b3f1ec",
            "name": "Realme Narzo 50",
            "description": "Affordable gaming phone, minor scuffs but works great. With original box.",
            "price": 199,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "6803978622cfe38489ffdedb",
                "name": "Samsung"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:21:48.971Z",
            "updatedAt": "2025-04-20T11:21:48.971Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "128GB",
                "color": "Graphite Gray",
                "condition": "Used"
            },
            "_id": "6804d8cd13a2382a11b3f1ee",
            "name": "Xiaomi Redmi Note 11",
            "description": "Used for only 6 months. No issues at all. Screen guard applied.",
            "price": 150,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "6803978622cfe38489ffdedb",
                "name": "Samsung"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:21:49.176Z",
            "updatedAt": "2025-04-20T11:21:49.176Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "128GB",
                "color": "Awesome White",
                "condition": "Used"
            },
            "_id": "6804d8cd13a2382a11b3f1f0",
            "name": "Samsung Galaxy A52",
            "description": "A reliable mid-range phone. Minor frame wear, screen flawless.",
            "price": 220,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "6803978622cfe38489ffdedb",
                "name": "Samsung"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:21:49.383Z",
            "updatedAt": "2025-04-20T11:21:49.383Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Black",
                "condition": "Used"
            },
            "_id": "6804d907bb90ea3613af7d0f",
            "name": "iPhone 12",
            "description": "Gently used iPhone 12 with box and charger. No cracks or major scratches.",
            "price": 429,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "680396ea22cfe38489ffdd4b",
                "name": "IPhones"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:22:47.500Z",
            "updatedAt": "2025-04-20T11:22:47.500Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Black",
                "condition": "Used"
            },
            "_id": "6804d907bb90ea3613af7d11",
            "name": "iPhone 14",
            "description": "Gently used iPhone 12 with box and charger. No cracks or major scratches.",
            "price": 429,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "680396ea22cfe38489ffdd4b",
                "name": "IPhones"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:22:47.687Z",
            "updatedAt": "2025-04-20T11:22:47.687Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Black",
                "condition": "Used"
            },
            "_id": "6804d907bb90ea3613af7d13",
            "name": "iPhone 15",
            "description": "Gently used iPhone 12 with box and charger. No cracks or major scratches.",
            "price": 429,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "680396ea22cfe38489ffdd4b",
                "name": "IPhones"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:22:47.956Z",
            "updatedAt": "2025-04-20T11:22:47.956Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "128GB",
                "color": "Pine Green",
                "condition": "Used"
            },
            "_id": "6804d908bb90ea3613af7d15",
            "name": "OnePlus 9 Pro",
            "description": "Used OnePlus 9 Pro with high performance and great battery. Charger included.",
            "price": 399,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "6803978622cfe38489ffdedb",
                "name": "Samsung"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:22:48.163Z",
            "updatedAt": "2025-04-20T11:22:48.163Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Black",
                "condition": "Used"
            },
            "_id": "6804d908bb90ea3613af7d17",
            "name": "iPhone 16",
            "description": "Gently used iPhone 12 with box and charger. No cracks or major scratches.",
            "price": 429,
            "isAuction": false,
            "category": null,
            "subcategory": null,
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:22:48.366Z",
            "updatedAt": "2025-04-20T11:22:48.366Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "128GB",
                "color": "Stormy Black",
                "condition": "New"
            },
            "_id": "6804d908bb90ea3613af7d19",
            "name": "Google Pixel 6",
            "description": "Factory-unlocked Pixel 6 in perfect condition. Works with all networks.",
            "price": 449,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "6803978622cfe38489ffdedb",
                "name": "Samsung"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:22:48.570Z",
            "updatedAt": "2025-04-20T11:22:48.570Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Speed Blue",
                "condition": "Used"
            },
            "_id": "6804d908bb90ea3613af7d1b",
            "name": "Realme Narzo 50",
            "description": "Affordable gaming phone, minor scuffs but works great. With original box.",
            "price": 199,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "6803978622cfe38489ffdedb",
                "name": "Samsung"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:22:48.773Z",
            "updatedAt": "2025-04-20T11:22:48.773Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "128GB",
                "color": "Graphite Gray",
                "condition": "Used"
            },
            "_id": "6804d908bb90ea3613af7d1d",
            "name": "Xiaomi Redmi Note 11",
            "description": "Used for only 6 months. No issues at all. Screen guard applied.",
            "price": 150,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "6803978622cfe38489ffdedb",
                "name": "Samsung"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:22:48.979Z",
            "updatedAt": "2025-04-20T11:22:48.979Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "128GB",
                "color": "Awesome White",
                "condition": "Used"
            },
            "_id": "6804d909bb90ea3613af7d1f",
            "name": "Samsung Galaxy A52",
            "description": "A reliable mid-range phone. Minor frame wear, screen flawless.",
            "price": 220,
            "isAuction": false,
            "category": null,
            "subcategory": {
                "_id": "6803978622cfe38489ffdedb",
                "name": "Samsung"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": null,
            "createdAt": "2025-04-20T11:22:49.191Z",
            "updatedAt": "2025-04-20T11:22:49.191Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Red",
                "condition": "New"
            },
            "_id": "6804dbc1a4f39ab8795c876c",
            "name": "22",
            "description": "22",
            "price": 500,
            "isAuction": false,
            "category": {
                "_id": "674f9d1ca625626a2353c337",
                "name": "Smartwatches"
            },
            "subcategory": {
                "_id": "680397b322cfe38489ffdf5a",
                "name": "Apple"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": [
                "/uploads/1745148865236-795562772-th.jpg"
            ],
            "createdAt": "2025-04-20T11:34:25.717Z",
            "updatedAt": "2025-04-20T11:34:25.717Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Blue",
                "condition": "New"
            },
            "_id": "6804ddc28d8a20ba537bb025",
            "name": "111",
            "description": "111",
            "price": 250,
            "isAuction": false,
            "category": {
                "_id": "674f9d1ca625626a2353c332",
                "name": "Mobiles"
            },
            "subcategory": {
                "_id": "680396ea22cfe38489ffdd4b",
                "name": "IPhones"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": [
                "/uploads/1745149378303-277477995-I11.jpg"
            ],
            "createdAt": "2025-04-20T11:42:58.439Z",
            "updatedAt": "2025-04-20T11:42:58.439Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Black",
                "condition": "Used"
            },
            "_id": "6805c673a1ceb3203a671f6d",
            "name": "iphone 17",
            "description": "Good for gaming",
            "price": 425,
            "isAuction": false,
            "category": {
                "_id": "674f9d1ca625626a2353c332",
                "name": "Mobiles"
            },
            "subcategory": {
                "_id": "680396ea22cfe38489ffdd4b",
                "name": "IPhones"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": [
                "/uploads/1745208946933-779198136-th.jpg"
            ],
            "createdAt": "2025-04-21T04:15:47.179Z",
            "updatedAt": "2025-04-21T04:33:55.732Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Red",
                "condition": "New"
            },
            "_id": "68060705a78d457a4d929819",
            "name": "HP",
            "description": "hp",
            "price": 4000,
            "isAuction": false,
            "category": {
                "_id": "67d885a16a3c7769888b72d7",
                "name": "Computers"
            },
            "subcategory": {
                "_id": "68039a4e22cfe38489ffe7e4",
                "name": "Laptops"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": [
                "/uploads/1745225477684-588658713-S25 .jpg"
            ],
            "createdAt": "2025-04-21T08:51:17.828Z",
            "updatedAt": "2025-04-21T08:51:17.828Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Red",
                "condition": "New"
            },
            "_id": "680607bf32d70b5829eaa94f",
            "name": "W 33",
            "description": "w 33",
            "price": 350,
            "isAuction": false,
            "category": {
                "_id": "674f9d1ca625626a2353c332",
                "name": "Mobiles"
            },
            "subcategory": {
                "_id": "6803978622cfe38489ffdedb",
                "name": "Samsung"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": [
                "/uploads/1745225663792-39847247-I12.jpg"
            ],
            "createdAt": "2025-04-21T08:54:23.966Z",
            "updatedAt": "2025-04-21T08:54:23.966Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "256GB",
                "color": "Blue",
                "condition": "Used"
            },
            "_id": "68079d525fec199b071977ef",
            "name": "S 122",
            "description": "S 121",
            "price": 222,
            "isAuction": false,
            "category": {
                "_id": "674f9d1ca625626a2353c332",
                "name": "Mobiles"
            },
            "subcategory": {
                "_id": "680396ea22cfe38489ffdd4b",
                "name": "IPhones"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": [
                "/uploads/1745329490810-104340082-S25 .jpg"
            ],
            "createdAt": "2025-04-22T13:44:50.956Z",
            "updatedAt": "2025-04-22T13:45:35.684Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "64GB",
                "color": "Red",
                "condition": "Used"
            },
            "_id": "680918fe1bf7b6a7b160e608",
            "name": "LED 1",
            "description": "LED Screen",
            "price": 150,
            "isAuction": false,
            "category": {
                "_id": "674f9d1ca625626a2353c33d",
                "name": "Monitors"
            },
            "subcategory": {
                "_id": "6803965622cfe38489ffdc0a",
                "name": "LED"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": [
                "/uploads/1745426686523-600789972-a16.jpg"
            ],
            "createdAt": "2025-04-23T16:44:46.786Z",
            "updatedAt": "2025-04-23T16:44:46.786Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "128GB",
                "color": "Red",
                "condition": "New"
            },
            "_id": "680919201bf7b6a7b160e66c",
            "name": "LED 2",
            "description": "LED Screen",
            "price": 121,
            "isAuction": false,
            "category": {
                "_id": "674f9d1ca625626a2353c33d",
                "name": "Monitors"
            },
            "subcategory": {
                "_id": "6803965622cfe38489ffdc0a",
                "name": "LED"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": [
                "/uploads/1745426720511-200529550-A25.jpg"
            ],
            "createdAt": "2025-04-23T16:45:20.651Z",
            "updatedAt": "2025-04-23T16:45:20.651Z",
            "__v": 0
        },
        {
            "specifications": {
                "capacity": "256GB",
                "color": "Blue",
                "condition": "Used"
            },
            "_id": "6809193f1bf7b6a7b160e6d0",
            "name": "LED 3",
            "description": "111",
            "price": 222,
            "isAuction": false,
            "category": {
                "_id": "674f9d1ca625626a2353c33d",
                "name": "Monitors"
            },
            "subcategory": {
                "_id": "6803965622cfe38489ffdc0a",
                "name": "LED"
            },
            "seller": {
                "_id": "67322fc629f3c194f356342a",
                "name": "seller"
            },
            "images": [
                "/uploads/1745426751561-201839876-I14.jpg"
            ],
            "createdAt": "2025-04-23T16:45:51.821Z",
            "updatedAt": "2025-04-23T16:45:51.821Z",
            "__v": 0
        }
    ],
    "auctions": [
        {
            "_id": "680607ec32d70b5829eaa9d7",
            "productId": "680607e932d70b5829eaa9d4",
            "sellerId": "67322fc629f3c194f356342a",
            "startingBid": 560,
            "currentBid": 100000000000000000,
            "currentBidder": "67322fc629f3c194f356342a",
            "startTime": "2025-04-27T17:53:00.000Z",
            "endTime": "2025-04-27T17:54:00.000Z",
            "status": "completed",
            "bidders": [
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 5000,
                    "_id": "680e58de9597ce9648860262",
                    "bidTime": "2025-04-27T16:18:38.088Z"
                },
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 60000,
                    "_id": "680e5a54cf2f398f10660b92",
                    "bidTime": "2025-04-27T16:24:52.654Z"
                },
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 70000,
                    "_id": "680e5abb0a6a829f48997db7",
                    "bidTime": "2025-04-27T16:26:35.661Z"
                },
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 800000,
                    "_id": "680e5bbd213bdd47fcea98ae",
                    "bidTime": "2025-04-27T16:30:53.078Z"
                },
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 10000000,
                    "_id": "680e5c9393b81f0c3c8b7592",
                    "bidTime": "2025-04-27T16:34:27.927Z"
                },
                {
                    "userId": "6732321729f3c194f3563432",
                    "name": "seller",
                    "bidAmount": 100000001,
                    "_id": "680e65936e225af785fafaaa",
                    "bidTime": "2025-04-27T17:12:51.286Z"
                },
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 1000000044,
                    "_id": "680e6642975674d8f64a35b3",
                    "bidTime": "2025-04-27T17:15:46.847Z"
                },
                {
                    "userId": "6732321729f3c194f3563432",
                    "name": "seller",
                    "bidAmount": 1000000045,
                    "_id": "680e66596e225af785fb071b",
                    "bidTime": "2025-04-27T17:16:09.198Z"
                },
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 100000000000000000,
                    "_id": "680e6b29fdb46256aa13a092",
                    "bidTime": "2025-04-27T17:36:41.361Z"
                }
            ],
            "__v": 9,
            "auctionStatus": "awarded"
        },
        {
            "auctionStatus": "pending",
            "_id": "6807698142371210088c2ac0",
            "productId": "6807697e42371210088c2abd",
            "sellerId": "67322fc629f3c194f356342a",
            "startingBid": 331,
            "currentBid": 60000,
            "currentBidder": "67322fc629f3c194f356342a",
            "startTime": "2025-04-26T10:00:00.000Z",
            "endTime": "2025-04-26T10:02:00.000Z",
            "status": "completed",
            "bidders": [
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 5000,
                    "_id": "680ca22e86494e023de4243b",
                    "bidTime": "2025-04-26T09:06:54.520Z"
                },
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 60000,
                    "_id": "680caec247f6fad4f3b4b4a8",
                    "bidTime": "2025-04-26T10:00:34.350Z"
                }
            ],
            "__v": 2
        },
        {
            "_id": "68079dfd5fec199b07197910",
            "productId": "68079dfa5fec199b071978fd",
            "sellerId": "67322fc629f3c194f356342a",
            "startingBid": 551,
            "currentBid": 10000,
            "currentBidder": "67322fc629f3c194f356342a",
            "startTime": "2025-04-26T19:20:00.000Z",
            "endTime": "2025-04-26T19:21:00.000Z",
            "status": "completed",
            "bidders": [
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 555,
                    "_id": "680c87295b9c3ece499a0884",
                    "bidTime": "2025-04-26T07:11:37.407Z"
                },
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 5999,
                    "_id": "680ca23986494e023de424b6",
                    "bidTime": "2025-04-26T09:07:05.122Z"
                },
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 10000,
                    "_id": "680ce553fcdfb0c777ab6acb",
                    "bidTime": "2025-04-26T13:53:23.651Z"
                }
            ],
            "__v": 3,
            "auctionStatus": "pending"
        },
        {
            "_id": "680d32a2147d17d79d385622",
            "productId": "680d32a0147d17d79d38561d",
            "sellerId": "67322fc629f3c194f356342a",
            "startingBid": 984,
            "currentBid": 9000000000000000,
            "currentBidder": "67322fc629f3c194f356342a",
            "startTime": "2025-04-27T19:07:00.000Z",
            "endTime": "2025-04-27T19:08:00.000Z",
            "status": "completed",
            "auctionStatus": "awarded",
            "bidders": [
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 2009000,
                    "_id": "680d32d6147d17d79d38574e",
                    "bidTime": "2025-04-26T19:24:06.245Z"
                },
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 5000000000,
                    "_id": "680d33cd1d551ae701cb7c25",
                    "bidTime": "2025-04-26T19:28:13.581Z"
                },
                {
                    "userId": "67322fc629f3c194f356342a",
                    "name": "seller",
                    "bidAmount": 9000000000000000,
                    "_id": "680e1e0ba3c74d03546b961f",
                    "bidTime": "2025-04-27T12:07:39.306Z"
                }
            ],
            "__v": 3
        }
    ]
}
  */
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
  }
}));