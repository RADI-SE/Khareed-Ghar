import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/";

axios.defaults.withCredentials = true;

export const useSellerService = create((set) => ({
  products: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  Error: null,
  setError: (message) => set({ Error: message }),
  clearError: () => set({ Error: null, isError: false, isLoading: true }),

  // Corrected addProduct function
 
  addProduct: async (
    token,
    name,
    description,
    specifications,
    price,
    category,
    subcategory,
    seller,
    images,
    isAuction,
    isConsigned,
    consignmentStatus,


  ) => {
    try {
      // Set loading state while performing request
      set({ isLoading: true, Error: null, isError: false });
      // Create FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("specifications", JSON.stringify(specifications)); 
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("seller", seller);
      formData.append("isAuction", isAuction );  
      formData.append("isConsigned", isConsigned || false);
      formData.append("consignmentStatus", consignmentStatus || 'pending');
      // Loop through images array and append each file
      images.forEach((file) => {
        formData.append("file", file);
       });
  
         // Make POST request
      const response = await axios.post(
        `${API_URL}products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      ); 
      toast.success(response.data.message);
      return  response.data.product._id;
    } catch (error) {
      toast.success(error.response.data.message);
  
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
  

  getProducts: async () => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(`http://localhost:5000/api/products`);

      if (response.status === 200) {
        set({ isLoading: false, products: response.data.products });
        return response.data.products;
      }
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching products.",
      });
    }
  },

  // getProductById
  getProductById: async (id) => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(
        `http://localhost:5000/api/seller/productsById/${id}`
      );
      if (response.status === 200) {
        set({ isLoading: false, product: response.data.product });
      }
      return response.data.product;
    } catch (error) {
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
  // updateProduct
  editProduct: async(
    token,
    id,
    name,
    description,
    specifications,
    price,
    isConsigned,
    consigneeId,
    consignmentStatus,
    images
  ) =>{

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("specifications", JSON.stringify(specifications));
    formData.append("price", price);
    formData.append("isConsigned", isConsigned || false);
    formData.append("consigneeId", consigneeId || null);
    formData.append("consignmentStatus", consignmentStatus || 'pending');
    images.forEach((file) => {
      formData.append("file", file);
     });
    let response;
    try {
      set({ isLoading: true, Error: null, isError: false });
      response = await axios.put(
        `${API_URL}/seller/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        set({ isLoading: false, Error: null });
      }
      toast.success(response.data.message);
    } catch (error) {
      
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while updating product.",
      });
      // toast.error(error.response?.data?.message || "error occured while editing product");
      toast.error(error.response.data.message);
    }
  },

  // deleteProduct
  deleteProduct: async (token, id, name) => {
    try { 
      set({ isLoading: true, Error: null, isError: false });

      const response = await axios.delete(
        `${API_URL}/seller/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { name }, 
        }
      );
 
      if (response.status === 200) {
        set({ isLoading: false, Error: null });
      }
      toast.success(response.data.message);
    } catch (error) {
 
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while deleting the product.",
      });
      toast.error(error.response.data.message);
    }
  },

  // getUserProducts
  getUserProducts: async (id) => {
    try {
       set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(`http://localhost:5000/api/getProductsByUserId/${id}`);
      
      if (!response.data || !response.data.products) {
        console.warn("getUserProducts - No products found in response");
        return [];
      }
      
      set({ isLoading: false });
      return response.data.products;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.response?.data?.message || error.message || "Error fetching user products"
      });
      return [];
    }
  },

  getSimilarProducts: async (id) => {
    try { ``
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(`http://localhost:5000/api/seller/getSimilarProducts/${id}`);
      return response.data;
      } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching similar products.",
      });
    }
  },
  // createAuction
  createAuction: async (productId, startingBid, startTime, endTime) => {
    try {

      set({ isLoading: true, Error: null, isError: false });
      await axios.post(`${API_URL}auction`, {
        productId,
        startingBid,
        startTime,
        endTime,
      });
      toast.success(response.data.message);
    } catch (error) {
      set({ isLoading: false, isError: true, Error: error.message });
      toast.error(error.respone.data.message);
    }
  },

  getAuctions: async () => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(`http://localhost:5000/api/ongoing`);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch auctions');
      }
      
      set({ isLoading: false, auctions: response.data.auctions });
      return response.data.auctions || [];
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching auctions."
      });
      throw error;
    }
  },
  
  getUserAuction: async () => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(`http://localhost:5000/api/userAuctions`); 
      return response.data.auctions;
     } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching auctions."
      });
      throw error;
    }
  },


  // getAuctionsById
  getAuctionsById: async (id) => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(
        `http://localhost:5000/api/getAuctionsById/${id}`
      );
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching auctions.",
      });
    }
  },
  editAuctions: async(
    id,
    startTime,
    endTime,

  ) =>{
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.put(
        `http://localhost:5000/api/editAuctions/${id}`,
        {
          startTime,
          endTime,

        },
      ); 
      if (response.status === 200) {
        set({ isLoading: false, Error: null });
      }
      toast.success(response.data.message);
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while updating Auction.",
      });
      toast.error(error.respone.data.message);
    }
  },

  // deleteAuction
  deleteAuction: async (id) => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.delete(`http://localhost:5000/api/deleteAuction/${id}`);
      toast.success(response.data.message);
      set({ isLoading: false, Error: null });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while deleting auction.",
        });
      toast.error(error.respone.data.message);
    }
  },

  getCurrentLeftTime: async (id) => {
    try {

       set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(`http://localhost:5000/api/getCurrentLeftTime/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch current left time');
      }
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching current left time.",
      });
    }
  },

  bidAuction  : async (auctionId, bidAmount) => {
    try {
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.post(`http://localhost:5000/api/bidding`, { auctionId, bidAmount });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching bidding.",
      });
    }
  },
  getAuctionStatus: async (auctionId, auctionStatus ) => {
    try {    
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.patch(`http://localhost:5000/api/${auctionId}/auctionStatus`, { auctionStatus });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching auction status.",
      });
    }
  },
  

  getNotifications: async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/seller-notifications`);
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching notifications.",
      });
    }
  },


  getBuyerNotifications: async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/buyer-notifications`);
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching notifications.",
      });
    }
  },

  updateBuyerNotification: async (id, read) => {
    try {

      const response = await axios.put(`http://localhost:5000/api/buyer-notifications/${id}`, { read } );
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while updating notification.",
      });
    }
  },  
  updateNotification: async (id, read) => {

    try {
      const response = await axios.put(`http://localhost:5000/api/seller-notifications/${id}`, { read } );
      return response.data;
    } catch (error) { 
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while updating notification.",
      });
    }
  },  

  getFeedbackByProductId: async (id) => {
    try { 
      console.log("testid:::::::::::::::::::::::::::", id)
      set({ isLoading: true, Error: null, isError: false });
      const response = await axios.get(`http://localhost:5000/api/get-feedback-by-product-id/${id}`);
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching feedback by product id.",
      });
    }
  },
}));

export const useStoreService = create((set) => ({
  sellerStore: async(id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/seller-store/${id}`);
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching seller store.",
      }); 

    }
  },
  getSimilarAuctions: async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/seller/similarAuctions/${id}`);
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        Error: error.message || "An error occurred while fetching similar auctions.",
      });
    }
  },

  

}));


// {data: Array(1), status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
// config
// : 
// {transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
// data
// : 
// Array(1)
// 0
// : 
// {_id: '6820ba3e2b1d9c9aed9802f1', sellerId: '6820ba392b1d9c9aed9802ef', storeName: 'Radhi', businessType: 'Fazool', storeTagline: 'Gandagi', …}
// length
// : 
// 1
// [[Prototype]]
// : 
// Array(0)
// headers
// : 
// AxiosHeaders {content-length: '365', content-type: 'application/json; charset=utf-8'}
// request
// : 
// XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: true, upload: XMLHttpRequestUpload, …}
// status
// : 
// 200
// statusText
// : 
// "OK"
// [[Prototype]]
// : 
// Object