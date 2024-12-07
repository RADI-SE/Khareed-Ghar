import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/";

axios.defaults.withCredentials = true;

export const useSellerService = create((set) => ({
  products: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  Error: null,
  setError: (message) => set({ Error: message }),
  clearError: () => set({ Error: null, isError: false, isLoading: true }),

  // Corrected addProduct function
 
  addProduct: async (
    token,
    name,
    description,
    specifications,
    price,
    category,
    subcategory,
    seller,
    images
  ) => {
    try {
      // Set loading state while performing request
      set({ isLoading: true, Error: null, isError: false });
  
      console.log("specifications 1", specifications);
      console.log("file 1", images);
  
      // Create FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("specifications", JSON.stringify(specifications)); 
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("seller", seller);
  
      // Loop through images array and append each file
      images.forEach((file, index) => {
        formData.append("file", file);
        console.log(`Appending file ${index + 1}:`,"Image data", file);
      });
  
      console.log("specifications 2:", formData.get("specifications"));
      console.log("file count in FormData:", images);
  
      // Make POST request
      const response = await axios.post(
        `${API_URL}products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Product added successfully.");
        set({ isLoading: false, Error: null });
      }
    } catch (error) {
      console.error("Error while adding product:", error.message);
  
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while adding product.",
      });
    }
  },
  

  getProducts: async () => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(`http://localhost:5000/api/products`);
      console.log(response.data.products);

      if (response.status === 200) {
        set({ isLoading: false, products: response.data.products });
        return response.data.products;
      }
    } catch (error) {
      console.log(error.message);
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching products.",
      });
    }
  },
  // getProductById
  getProductById: async (id) => {
    try {
      console.log("id from the getProductById, ", id);
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(
        `http://localhost:5000/api/seller/productsById/${id}`
      );
      if (response.status === 200) {
        set({ isLoading: false, product: response.data.product });
      }
      return response.data.product;
    } catch (error) {
      console.log(error.message);
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching product.",
      });
    }
  },
  // updateProduct
  editProduct: async(
    token,
    id,
    name,
    description,
    specifications,
    price,
    category,
    seller,
    images
  ) =>{
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.put(
        `${API_URL}/seller/products/${id}`,
        {
          name,
          description,
          specifications,
          price,
          category,
          seller,
          images,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        set({ isLoading: false, Error: null });
      }
    } catch (error) {
      console.log(error.message);
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while updating product.",
      });
    }
  },

  // deleteProduct
  deleteProduct: async (token, id, name) => {
    try { 
      set({ isLoading: true, Error: null, isError: false });

      const response = await axios.delete(
        `${API_URL}/seller/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { name }, 
        }
      );
 
      if (response.status === 200) {
        set({ isLoading: false, Error: null });
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
 
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while deleting the product.",
      });
    }
  },
}));
