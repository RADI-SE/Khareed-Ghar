// src/services/authService.js
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api";

axios.defaults.withCredentials = true;

export const useAdminService = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  errorMessage: null,
  setError: (message) => set({ errorMessage: message }),
  clearError: () => set({ errorMessage: null }),

  displayUser: async (token, role) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(
        `${API_URL}/sellers`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ user: response.data, isAuthenticated: true, isLoading: false });
      const sellers = response.data.filter(
        (user) =>
          user.role === role ||
        (user.role === "banned" && user.originalRole === role)
      );
      return sellers;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
    }
  },

  displayUserProfile: async (token, id) => {
    try {
      set({ isLoading: true }); // Start loading
      const response = await axios.get( `${API_URL}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state with fetched user data
      set({ user: response.data, isAuthenticated: true, isLoading: false });

      return response.data.user;
    } catch (error) {
      // Handle error and stop loading
      set({ errorMessage: error.message, isLoading: false });
    }
  },
 
  editUserProfile: async (token, id, user) => {
    try {
      set({ isLoading: true });

      const response = await axios.put(`${API_URL}/user/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      toast.success(response.data.message);
      return response.data.user;
    } catch (error) {
      set({ 
        errorMessage: error.response?.data?.message || error.message, 
        isLoading: false 
      });
      
      const errorMessage = error.response?.data?.message || 'An error occurred while updating the profile';
      toast.error(errorMessage);
      return null;
    }
  },

  banUsers: async (token, id,role) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(
        `${API_URL}/ban-user/${id}`,
        {role}, 
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      toast.success(response.data.message);
      return response.data.user;
    } catch (error) {
      set({
        errorMessage: error.response?.data?.message || error.message,
        isLoading: false,
      });

      toast.error(response.data.message);
      throw error; 
      
    }
  },
}));
