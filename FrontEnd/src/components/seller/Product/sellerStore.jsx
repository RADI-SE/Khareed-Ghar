import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../Common/pagination";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditProductModal from "./edit/editProductModel";
import { ConfirmationModal } from "../../Common/confirmationModal/ConfirmationModel";
import { useDeleteProduct } from "../../../hooks/seller/useDeleteProduct";
import { useFetchProductsByUserId } from "../../../hooks/seller/useFetchProductsByUserId";
import { useFetchUserAuction } from "../../../hooks/seller/Auctions/useFetchUserAuction";
import ProductCard from "../../Common/ProductCard";
import AuctionCard from "../../Common/AuctionCard";
import { useAdminService } from "../../../services/adminServices";
import "react-toastify/dist/ReactToastify.css";

const SellerStore = () => {
  const { id } = useParams();
  const {getUserProfile} = useAdminService();
  const [currentPage, setCurrentPage] = useState(0);
  const [activeTab, setActiveTab] = useState("products");
  const rowsPerPage = 8;
  const startIndex = currentPage * rowsPerPage;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmationName, setConfirmationName] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const token = sessionStorage.getItem("token");
  const currentUserId = sessionStorage.getItem("id");
  const isCurrentUserStore = id === currentUserId;
 
  useEffect(() => {
    const fetchUserProfile = async () => {  
      try {
        const response = await getUserProfile(id);
        
        setUserProfile(response);
       
      } catch (error) {
        console.error("Error fetching user profile:", error);}
    };
    fetchUserProfile();
  }, [getUserProfile, id]);


  console.log("User Profile:", userProfile);
  const products = userProfile?.products || [];
  const auctions = userProfile?.auctions || [];
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const paginatedAuctions = auctions.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

 

 

  return (
    <div className="p-4">
      <div className="mb-6">
        <h4 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-3">Store</span>
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {activeTab === "products" ? `${products.length} items` : `${auctions.length} auctions`}
          </span>
        </h4>
      </div>

      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "products"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "auctions"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("auctions")}
        >
          Auctions
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {activeTab === "products" ? (
          paginatedProducts?.map((product) => (
            <div key={product._id} className="relative">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          paginatedAuctions?.map((auction) => (
            <div key={auction._id} className="relative">
              <AuctionCard auctions={auction} />
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <Pagination
          totalItems={activeTab === "products" ? products.length : auctions.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SellerStore;