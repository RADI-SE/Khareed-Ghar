// src/services/authService.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthService = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  errorMessage: null,
  isError: false,
  successMessage: null,
  setError: (message) => set({ errorMessage: message }),
  clearError: () => set({ errorMessage: null }),

  signup: async (
    name,
    email,
    password,
    confirmPassword,
    role,
    isAgreeToTerms,
    storeName, 
    businessType, 
    storeTagline, 
    physicalStoreAddress, 
    phoneNumber, 
    bankAccountNumber, 
    bankName, 
  ) => {
    set({ isLoading: true, errorMessage: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
        isAgreeToTerms,
        storeName, 
        businessType, 
        storeTagline, 
        physicalStoreAddress, 
        phoneNumber, 
        bankAccountNumber, 
        bankName
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        successMessage: response.data.message
      });
      return response.data;
    } catch (error) {
      let errorMessage;
      if (!error.response) {
        // Network error
        errorMessage = "Network error: Please check your internet connection";
      } else if (error.response.status === 500) {
        // Server error
        errorMessage = "Server error: Please try again later";
      } else {
        // Backend validation error or other error
        errorMessage = error.response?.data?.message || "An error occurred during signup";
      }
      
      set({ 
        isLoading: false, 
        isError: true, 
        errorMessage: errorMessage 
      });
      throw error;
    }
  },

  resendVerificationCode: async (email) => {
    set({ isLoading: true, errorMessage: null });
    try {
      const response = await axios.post(`${API_URL}/Resend-code`, {
        email: email,
      });
      if(response.status === 200){
        set({ isLoading: false, isError:false , errorMessage: null ,
          successMessage: "Verification code sent successfully"
        });
      }
     } catch (error) {
      set({ isLoading: false, isError:true , errorMessage: error.response.data.message });
      throw error;
    }
  },

    verifyEmail: async (verificationToken) => {
    set({ isLoading: false, errorMessage: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {
        code: verificationToken,
      });
  
        const user = response.data.user;
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
        return user;
    
    } catch (error) {
      set({ isLoading: false,isError:true , errorMessage: error.response.data.message });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  signin: async (email, password) => {
    set({ isLoading: true, errorMessage: null });
  
    try {
      const response = await axios.post(`${API_URL}/signin`, { email, password });
  
      if (response.data && response.data.user) {
        const user = response.data.user;
        set({
          user: user,
          isAuthenticated: true,
          isLoading: false,
          isCheckingAuth: false,
        });
        return user;
      } else {
        throw new Error("User data is missing in the response");
      }
    } catch (error) {
      set({
        isLoading: false,isError:true , 
        errorMessage: error.response?.data?.message || error.message || "An error occurred during sign-in.",
      });
    }
  },
   
  signout: async () => {
    set({ user: null, isAuthenticated: false, isLoading: false });
    try {
      const response = await axios.post(`${API_URL}/logout`);
      // localStorage.removeItem("token");
      return response.data;
    } catch (error) {}
  },

  resetPassword: async (email) => {
    set({ isLoading: true, errorMessage: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email: email,
      });
      set({ isLoading: false });
    } catch (error) {
      set({
        errorMessage: null,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  rPassword: async (token, password, confirmPassword) => {
    set({ isLoading: true, errorMessage: null });
    try {
    const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password: password,
        confirmPassword: confirmPassword,
      });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ errorMessage: null, isCheckingAuth: false, isAuthenticated: false });
      throw error;
    }
  },
}));
