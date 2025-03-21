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
      console.log("form  displayUser :  sellers ",sellers);
      return sellers;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
      console.error("Error fetching sellers:", error);
    }
  },

  displayUserProfile: async (token, id) => {
    try {
      set({ isLoading: true }); // Start loading
      console.log("id", id);
      const response = await axios.get( `${API_URL}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state with fetched user data
      set({ user: response.data, isAuthenticated: true, isLoading: false });
      console.log("User Profile:  ..... ", response.data.user);

      return response.data.user;
    } catch (error) {
      // Handle error and stop loading
      set({ errorMessage: error.message, isLoading: false });
      console.error("Error fetching user profile:", error);
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
      set({ errorMessage: error.message, isLoading: false });
      console.error("Error updating user profile:", error);
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

      console.error("Error banning/unbanning user:", error.response || error);
      throw error; 
    }
  },
}));
