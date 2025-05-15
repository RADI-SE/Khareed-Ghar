import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/";

axios.defaults.withCredentials = true;

export const useConsigneeService = create((set) => ({
    consigneeProducts: null,
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    Error: null, 

    setError: (message) => set({ Error: message }),
    clearError: () => set({ Error: null, isError: false, isLoading: true }),
 
    acceptConsignment: async (consignedProducts) => {
        try {
            set({ isLoading: true });
            const response = await axios.post(API_URL + "consignee/accept-consignment", { consignedProducts });
            set({ isLoading: false });
            return response.data;
        } catch (error) {
            set({ isError: true, Error: error.response.data.message });
            throw error;
        }
    },

    updateProductForConsignment: async ({ id, consigneeId, consignmentStatus }) => {
        try {
            set({ isLoading: true, isError: false, Error: null });
            const response = await axios.put(API_URL + "consignee/update-consignment/" + id, {
                consigneeId,
                consignmentStatus
            });
            set({ isLoading: false });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update consignment status";
            set({ 
                isLoading: false, 
                isError: true, 
                Error: errorMessage 
            });
            throw new Error(errorMessage);
        }
    },

    getConsigneeProducts: async () => {
        try {
            set({ isLoading: true });
            const response = await axios.get(API_URL + "consignee/get-consigned-products");
            console.log("Response From Consignee Service:", response.data);
            
            // Extract the consignedProducts array from the response
            const products = response.data?.consignedProducts || [];
            
            set({ 
                consigneeProducts: products,
                isLoading: false 
            });
            return products;
        } catch (error) {
            set({ 
                isError: true, 
                Error: error.response?.data?.message || "Failed to fetch consignee products",
                isLoading: false 
            });
            throw error;
        }
    }
}));

