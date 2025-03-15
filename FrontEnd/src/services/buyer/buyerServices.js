import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useCartService = create((set) => ({
  cart: null,
  isLoading: false,
  errorMessage: null,
  setError: (message) => set({ errorMessage: message }),
  clearError: () => set({ errorMessage: null }),
 
  addToCart: async (productId, quantity) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.post(
        `http://localhost:5000/api/add-to-cart`,
        { productId, quantity }
      );
      set({ cart: response.data, isLoading: false });
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  }, 

  displayCart: async () => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.get("http://localhost:5000/api/cart-items");
      set({ cart: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      set({
        errorMessage: error.response?.data?.message || error.message,
        isLoading: false,
      });
      return [];
    }
  },
 
  removeFromCart: async (productId) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.delete(
        `http://localhost:5000/api/remove-from-cart`,
        {
          data: { productId },
        }
      );
      set({ cart: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },
 
  clearCart: async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/clear`);
      console.log("response", response);
      set({ cart: response.data, isLoading: false });
      return response.data.message
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },
}));


export const useAddressService = create((set) => ({
  address: null,
  createLocation: async (street, state, city, phoneNumber) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.post(
        `http://localhost:5000/api/create-location`,
        { street, state, city, phoneNumber }
      );
      set({ address: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  }, 

  updateAddress: async ( id, street, state, city, phoneNumber) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.put(
        `http://localhost:5000/api/update-location/${id}`,
        { street, state, city, phoneNumber}
      );
      set({ address: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },

  getLocationById: async () => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.post(
        `http://localhost:5000/api/locations/`,
      );
      set({ address: response.data, isLoading: false });
      return response.data;
    
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },

  removeAddress: async (addressId) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.delete(`http://localhost:5000/api/locations/${addressId}`);
      set({ address: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  }
}));
