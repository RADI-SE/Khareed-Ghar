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
       set({ cart: response.data, isLoading: false });
      return response.data.message
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },
}));


export const useAddressService = create((set, get) => ({
  address: null,
  selectedLocation: null,
  getSelectedLocation: () => get().selectedLocation,
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
      return response?.data || [];
    
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
  },
//  Fetch a selected location by ID
fetchSelectedLocation: async (id) => {
  try {
     set({ isLoading: true, errorMessage: null });
    const response = await axios.get(
      `http://localhost:5000/api/selected-location/${id}`
    );
    set({ selectedLocation: response.data, isLoading: false });
    return response.data;
  } catch (error) {
    set({ errorMessage: error.message, isLoading: false });
  }
},

//  Get selected location from state
getSelectedLocation: () => get().selectedLocation,


}));
export const useBuyerService = create((set) => ({
  becomeSeller: async (storeName, businessType, storeTagline, physicalStoreAddress, phoneNumber, bankAccountNumber, bankName) => {
    try {
      console.log("test-1")
      set({ isLoading: true, errorMessage: null });
      const response = await axios.post(`http://localhost:5000/api/create-seller-store`, {storeName, businessType, storeTagline, physicalStoreAddress, phoneNumber, bankAccountNumber, bankName});
      console.log("test-2")
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      console.log("test-3")
      set({ errorMessage: error.message, isLoading: false });
    }
  },
  searchProduct: async (name, type) => {
    try {
      console.log("test-1")
      console.log(name);
      console.log(type);
      set({ isLoading: true, errorMessage: null });
      const response = await axios.get(`http://localhost:5000/api/search?name=${name}&type=${type}`);
      console.log("test-2")
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      console.log("test-3")
      set({ errorMessage: error.message, isLoading: false });
    }
  },
  addFeedback: async (productId, rating, comment) => {
    try {
      console.log("test-1feedback")
      set({ isLoading: true, errorMessage: null });
      const response = await axios.post(`http://localhost:5000/api/add-feedback`, { productId, rating, comment });
      console.log("test-2feedback")
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      console.log("test-3feedback")
      set({ errorMessage: error.message, isLoading: false });
    }
  },
  getProductFeedback: async (id) => {
    try {
      console.log("test-1 get feedback", id)
      set({ isLoading: true, errorMessage: null });
      const response = await axios.get(`http://localhost:5000/api/get-product-feedback/${id}`);
      console.log("test-2 get feedback", response)
      set({ isLoading: false });
      return response.data.feedbacks;
    } catch (error) {
      console.log("test-3 get feedback")
      set({ errorMessage: error.message, isLoading: false });
    }
  },
  updateFeedback: async (id, rating, comment) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.put(`http://localhost:5000/api/update-feedback/${id}`, { rating, comment });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },
  deleteFeedback: async (id) => {
    try {
      set({ isLoading: true, errorMessage: null });
      const response = await axios.delete(`http://localhost:5000/api/delete-feedback/${id}`);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },
  deleteBuyerFeedback: async (feedbackId) => {
    try {
      console.log("Feedback ID from service ", feedbackId);
      set({ isLoading: true, errorMessage: null });
      const response = await axios.delete(`http://localhost:5000/api/delete-buyer-feedback/${feedbackId}`);
      console.log("Feedback ID from service ", response);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },
  updateFeedback: async (feedbackId) => {
    try {
     
      console.log("test-1 update feedback")
      console.log(feedbackId)
 
      set({ isLoading: true, errorMessage: null });
      const response = await axios.put(`http://localhost:5000/api/update-feedback/${feedbackId.feedbackId}`, { rating: feedbackId.rating, comment: feedbackId.comment });
      console.log("test-2 update feedback")
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }

  },

}));

 
