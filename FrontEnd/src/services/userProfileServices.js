// src/services/authService.js
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const API_URL = "http://localhost:5000/api/";

axios.defaults.withCredentials = true;

export const userProfileServices = create((set) => ({

    editUserProfile: async (user) => {
        try {


            const response = await axios.put(`${API_URL}edit-profile`, user);

            toast.success(response.data.message);
            return response.data;

        } 
        catch (error) {

            console.error(error);
            toast.error(error.response.data.message);
            throw error;
        }
    },

    getUserProfile: async () => {
        try {

            const response = await axios.get(`${API_URL}getUserProfile`);

            return response.data.user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


  ));