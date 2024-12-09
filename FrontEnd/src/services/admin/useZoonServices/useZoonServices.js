import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/";

axios.defaults.withCredentials = true;

export const useAdminService = create((set) => ({
  zoon: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  Error: null,
  setError: (message) => set({ Error: message }),
  clearError: () => set({ Error: null, isError: false, isLoading: true }),

  // Corrected addProduct function

  addZoon: async (id, district, city) => {
    try {

      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.post(`http://localhost:5000/api/add-to-menu`, 
        {
        id,
        district,
        city,
      });
      console.log("response.data," , response.data);

      if (response.status === 200) {
        set({ isLoading: false, Error: null });
      }
    } catch (error) {
      console.error("Error while adding zoon:", error.message);

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

  getZoon: async (id) => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(`http://localhost:5000/api/all`, {
        id: id,
      });
      console.log(response.data);

      if (response.status === 200) {
        set({ isLoading: false, zoon: response.data.zoon });
      }
      return response.data;
    } catch (error) {
      console.log(error.message);
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching zoon.",
      });
    }
  },
  // getProductById
  getZoonById: async (id) => {
    try {
      console.log("id from the getZoonById, ", id);

      console.log("Id from services", id);
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(
        `http://localhost:5000/api/search/${id}`
      );
      console.log("response   2", response.data);
      if (response.status === 200) {
        set({ isLoading: false, product: response.data.product });
      }
      return response.data;
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
  // updateProduc

  // Function to handle Zoon update
  editZoon: async (id, district, city) => {
    try {
      console.log("id from editZoon:", id, district, city);

      // Set loading state before making the API request
      set({ isLoading: true, Error: null, isError: false });

      // Make the PUT request to update data
      const response = await axios.put(
        `http://localhost:5000/api/update/${id}`,
        {
          district,
          city,
        }
      );

      // If the response is successful, reset loading state
      if (response.status === 200) {
        set({ isLoading: false, Error: null });
      }
    } catch (error) {
      console.log("Error occurred:", error.message);

      // Handle error by setting appropriate state
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while updating zoon.",
      });
    }
  },

  deleteZoon: async (id, district) => {
    try {
      set({ isLoading: true, Error: null, isError: false });

      const response = await axios.delete(`${API_URL}/delete/${id}`, {
        data: { district },
      });

      if (response.status === 200) {
        set({ isLoading: false, Error: null });
      }
    } catch (error) {
      console.error("Error deleting zoon:", error.message);

      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while deleting the zoon.",
      });
    }
  },
}));
