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
  // display cart
  displayCart: async () => {
    try {
      set({ isLoading: true, errorMessage: null });

      console.log("Hi from frontend");
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

  // removeFromCart
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

  //clearCart
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

// for user location
export const useAddressService = create((set) => ({
  address: null,
  // createLocation
  createLocation: async (userId, street, LOCATION, phoneNumber) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.post(
        `http://localhost:5000/api/create-location`,
        { userId, street, LOCATION, phoneNumber }
      );
      set({ address: response.data, isLoading: false });
      console.log("return from useAddressService ", address);
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },

  //
  // update location
  updateAddress: async (userId, street, LOCATION, phoneNumber, id) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.put(
        `http://localhost:5000/api/update-location/${id}`,
        { userId, street, LOCATION, phoneNumber }
      );
      set({ address: response.data, isLoading: false });
      console.log("return from useAddressService ", address);
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },

  //getLocationById
  getLocationById: async () => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.post(
        `http://localhost:5000/api/locations/`,
      );
      console.log("getLocationById::::::::", response.data);
      set({ address: response.data, isLoading: false });
      return response.data;
    
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },
}));
