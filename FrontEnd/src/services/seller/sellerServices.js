import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/";

axios.defaults.withCredentials = true;

export const useSellerService = create((set) => ({
  categories: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  Error: null,
  setError: (message) => set({ Error: message }),
  clearError: () => set({ Error: null , isError: false, isLoading: true }),

  addProduct: async (
    token,
    name,
    description,
    specifications,
    price,
    category,
    subcategory,
    seller,
    images
  ) => {
    try {
      set({ isLoading: true, Error: null, isError: false,});
      console.log(`price: ${price}`)
      const response = await axios.post(
        `${API_URL}/products`,
        {
          name,
          description,
          specifications,
          price,
          category,
          subcategory,
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
        set({
          isLoading: false,
          Error: null,
        });
      }
    } catch (error) {
      console.log(error.message);
      set({
        isLoading: false,isError:true , 
        Error: error.response?.data?.message || error.message || "An error occurred while adding product.",
      });
   
    }
  },
}));
