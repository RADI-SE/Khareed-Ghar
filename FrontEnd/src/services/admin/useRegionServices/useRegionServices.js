import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/";

axios.defaults.withCredentials = true;

export const useAdminService = create((set) => ({
  addRegion: async (id, state, city) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/add-to-menu`, 
        {
        id,
        state,
        city,
      });
      toast.success(response.data.message);
 
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getRegion: async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/all`);
       return response.data;
    } catch (error) {
      console.error("getRegion error.message",error.message);
    }
  },
  getRegionById: async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("getRegionById error.message ",error.message);
    }
  }, 

  editRegion: async (id, state, city) => {
    try {

      const response = await axios.put(
        `http://localhost:5000/api/update/${id}`,
        {
          state,
          city,
        }
      );
      toast.success(response.data.message);
      return response.data.message;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  deleteRegion: async (id, state) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`, {
        data: { state },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.error(error.respone.data.message);
    }
  },
}));
