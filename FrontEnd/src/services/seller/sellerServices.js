import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    images,
    isAuction
  ) => {
    try {
      // Set loading state while performing request
      set({ isLoading: true, Error: null, isError: false });
      // Create FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("specifications", JSON.stringify(specifications)); 
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("seller", seller);
      formData.append("isAuction", isAuction);  
      // Loop through images array and append each file
      images.forEach((file) => {
        formData.append("file", file);
       });
  
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
      toast.success(response.data.message);
      return  response.data.product._id;
    } catch (error) {
      console.error("Error while adding product:", error.message);
      toast.success(error.response.data.message);
  
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

      if (response.status === 200) {
        set({ isLoading: false, products: response.data.products });
        return response.data.products;
      }
    } catch (error) {
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
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(
        `http://localhost:5000/api/seller/productsById/${id}`
      );
      if (response.status === 200) {
        set({ isLoading: false, product: response.data.product });
      }
      return response.data.product;
    } catch (error) {
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
    let response;
    try {
      set({ isLoading: true, Error: null, isError: false });
      response = await axios.put(
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
      toast.success(response.data.message);
    } catch (error) {
      
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while updating product.",
      });
      // toast.error(error.response?.data?.message || "error occured while editing product");
      toast.error(error.response.data.message);
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
      toast.success(response.data.message);
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
      toast.error(error.response.data.message);
    }
  },

  // getUserProducts
  getUserProducts: async (id) => {
    try {
       const response = await axios.get(`http://localhost:5000/api/getProductsByUserId/${id}`);       
      return response.data.products;
     } catch (error) {
      console.error("Error fetching user products:", error.message);
    }
  },

  // createAuction
  createAuction: async (productId, startingBid, startTime, endTime) => {
    try {

      set({ isLoading: true, Error: null, isError: false });
      await axios.post(`${API_URL}auction`, {
        productId,
        startingBid,
        startTime,
        endTime,
      });
      toast.success(response.data.message);
    } catch (error) {
      set({ isLoading: false, isError: true, Error: error.message });
      toast.error(error.respone.data.message);
    }
  },

  getAuctions: async () => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(`http://localhost:5000/api/ongoing`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch auctions');
      }
      
      set({ isLoading: false, auctions: response.data.auctions });
      return response.data.auctions || [];
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching auctions."
      });
      throw error;
    }
  },
  
  getUserAuction: async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/userAuctions`); 
      return response.data.auctions;
     } catch (error) {
      console.error("Error fetching user products:", error.message);
    }
  },

  // getAuctionsById
  getAuctionsById: async (id) => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(
        `http://localhost:5000/api/getAuctionsById/${id}`
      );
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching auctions.",
      });
    }
  },
  editAuctions: async(
    id,
    startTime,
    endTime,

  ) =>{
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.put(
        `http://localhost:5000/api/editAuctions/${id}`,
        {
          startTime,
          endTime,

        },
      ); 
      if (response.status === 200) {
        set({ isLoading: false, Error: null });
      }
      toast.success(response.data.message);
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while updating Auction.",
      });
      toast.error(error.respone.data.message);
    }
  },

  // deleteAuction
  deleteAuction: async (id) => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.delete(`http://localhost:5000/api/deleteAuction/${id}`);
      toast.success(response.data.message);
      set({ isLoading: false, Error: null });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while deleting auction.",
        });
      toast.error(error.respone.data.message);
    }
  },

  getCurrentLeftTime: async (id) => {
    try {

       set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(`http://localhost:5000/api/getCurrentLeftTime/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch current left time');
      }
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching current left time.",
      });
      console.error("Error fetching current left time:", error.message);
    }
  },

  bidAuction  : async (auctionId, bidAmount) => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.post(`http://localhost:5000/api/bidding`, { auctionId, bidAmount });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching bidding.",
      });
      console.error("Error fetching bidding:", error.message);
    }
  },

  getNotifications: async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/seller-notifications`);
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  },

  updateNotification: async (id, read) => {
    try {
      console.log("updateNotification called");
      const response = await axios.put(`http://localhost:5000/api/seller-notifications/${id}`, { read } );
      console.log("response", response.data); 
      return response.data;
    } catch (error) {
      console.error("Error updating notification:", error.message);
    }
  },  




}));



