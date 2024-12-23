import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useCartService = create((set) => ({
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
  
  // removeFromCart
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

export const useAddressService = create((set)=>({
  address: null,
  createLocation: async (userId, street, LOCATION, phoneNumber)=>{
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.post(`http://localhost:5000/api/create-location`, {userId, street, LOCATION, phoneNumber });
      set({ address: response.data, isLoading: false });
      console.log("return from useAddressService ", address);
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },
}));