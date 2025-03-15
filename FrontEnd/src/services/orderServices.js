import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/";

axios.defaults.withCredentials = true;

export const useOrderService = create((set) => ({
    orders: null,
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    Error: null,
    setError: (message) => set({ Error: message }),
    clearError: () => set({ Error: null, isError: false, isLoading: true }),
 
    createOrder: async (CART_ID, SHIPPING_ADDRESS_ID) => {
        try {
            console.log("CART_ID",CART_ID, "SHIPPING_ADDRESS_ID",SHIPPING_ADDRESS_ID);
            const response = await axios.post(API_URL, {CART_ID, SHIPPING_ADDRESS_ID});
            set({ orders: response.data });
        } catch (error) {
            console.log("error", error.response.data.message);
        }
    },
}));

