// src/services/authService.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

axios.defaults.withCredentials = true;

export const useAdminService = create((set) => ({
  cart: null,
  isAuthenticated: false,
  isLoading: false,
  errorMessage: null,
  setError: (message) => set({ errorMessage: message }),
  clearError: () => set({ errorMessage: null }),

  // add to cart
  addToCart: async (id, productId, quantity) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.post(
        `http://localhost:5000/api/add-to-cart`,
      {  id,
        productId,
        quantity,}
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      );
      set({ cart: response.data, isLoading: false });
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },
  // display cart
  displayCart: async (id) => {
    try {
      set({ isLoading: true, errorMessage: null });
      console.log("response", id);
      const response = await axios.get(`http://localhost:5000/api/cart-items/${id}`);
      console.log("response   2", response.data);
      set({ cart: response.data, isLoading: false });
      return response.data; // Ensure data is always returned.
    } catch (error) {
      console.error("Error fetching cart:", error);
      set({ errorMessage: error.response?.data?.message || error.message, isLoading: false });
      return []; // Return an empty array as a fallback for cart items.
    }
  },
  
  // reomveFromCart
  removeFromCart: async (id, productId) => {
    console.log("removing from cart", id , productId);
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.delete(`http://localhost:5000/api/remove-from-cart/${id}`, {
        data: { productId },
      });
      console.log("responsefrom removeS 2" , response.data);
      set({ cart: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },
}));
