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
 
    getConsigneeProducts: async () => {
        try {
             const response = await axios.get(API_URL + "consignee/get-consignee-products");
            set({ consigneeProducts: response.data });
        } catch (error) {
            set({ isError: true, Error: error.response.data.message });
        }
    },
    getConsigneeProducts: async () => {
        try {
            set({ isLoading: true });
            const response = await axios.get(API_URL +"consignee/get-consignee-products");
            set({ consigneeProducts: response.data });
            return response.data;
        } catch (error) {
            set({ isError: true, Error: error.response.data.message });
        }
    },
    getConsigneeProducts: async () => {
        try {
            set({ isLoading: true });
            const response = await axios.get(API_URL +"consignee/get-consignee-products");
            set({ consigneeProducts: response.data });
            console.log("response.data",response.data);
            return response.data;
        } catch (error) {
            set({ isError: true, Error: error.response.data.message });
        }
    }
}));

