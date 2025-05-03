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
 
    createOrder: async (CART_ID, SHIPPING_ADDRESS_ID, PAYMENT_METHOD) => {
        try {
             const response = await axios.post(API_URL, {CART_ID, SHIPPING_ADDRESS_ID, PAYMENT_METHOD});
            set({ orders: response.data });
        } catch (error) {
        }
    },

    getOrders: async () => {
        try {
            set({ isLoading: true });
            const response = await axios.get(API_URL +"all-orders");
            set({ orders: response.data });
            return response.data;
        } catch (error) {
            set({ isError: true, Error: error.response.data.message });
        }
    },
}));

