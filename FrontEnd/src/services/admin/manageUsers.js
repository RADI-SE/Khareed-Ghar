// src/services/authService.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/";

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
        `http://localhost:5000/api/sellers`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ user: response.data, isAuthenticated: true, isLoading: false });
      console.log(response.data);
      const sellers = response.data.filter(
        (user) =>
          user.role === role ||
          (user.role === "banned" && user.originalRole === role)
      );
      return sellers;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
      console.error("Error fetching sellers:", error);
    }
  },

  displayUserProfile: async (token, id) => {
    try {
      set({ isLoading: true }); // Start loading
      const response = await axios.get(`http://localhost:5000/api/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state with fetched user data
      set({ user: response.data, isAuthenticated: true, isLoading: false });
      console.log("User Profile:  ..... ", response.data);

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

      const response = await axios.put(`${API_URL}user/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data.user;
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
      console.error("Error updating user profile:", error);
    }
  },

  banUsers: async (token, id,role) => {
    try {
      set({ isLoading: true });

      console.log("User ID from Zustand:", id);

      const response = await axios.put(
        `${API_URL}ban-user/${id}`,
        {role}, // Empty request body
        {
          headers: { Authorization: `Bearer ${token}` }, // Correctly placed headers
        }
      );

      // Update Zustand state with response
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return response.data.user; // Return the updated user data for further use
    } catch (error) {
      set({
        errorMessage: error.response?.data?.message || error.message,
        isLoading: false,
      });

      console.error("Error banning/unbanning user:", error.response || error);
      throw error; // Re-throw error to handle it where the function is called
    }
  },
}));
