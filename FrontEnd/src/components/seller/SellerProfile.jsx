import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useAuthService } from "../../services/authService";
import { useProfileInfo } from "../../hooks/Users/useProfileInfo";
import { EditModal } from "../Common/editProfileModal";
import { useEditProfile } from "../../hooks/Users/useEditProfile";
import { useFetchProductsByUserId } from "../../hooks/seller/useFetchProductsByUserId";

export const SellerProfile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isCheckingAuth, checkAuth, user } = useAuthService();
  const { data: profileData } = useProfileInfo();
  const { data: products = [], isLoading: isLoadingProducts } = useFetchProductsByUserId(user?._id);
  const { mutate: editUserProfile } = useEditProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !isCheckingAuth) {
      checkAuth();
    }
  }, [isAuthenticated, isCheckingAuth, checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth && (!isAuthenticated || !user)) {
      navigate("/auth/signin");
    }
  }, [isAuthenticated, isCheckingAuth, user, navigate]);

  const handleSaveField = (field, value) => {
    try {
      const updatedUser = { [field]: value };
      editUserProfile(
        { user: updatedUser },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
          onError: (err) => {
            console.error("Error updating profile:", err);
          },
        }
      );
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen mb-4">
      <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
        <img
          src={user.profilePicture || "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-gray-300"
        />
        <div className="ml-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {profileData?.name || 'User'}
            <button 
              className="ml-2 text-gray-500 hover:text-gray-700" 
              onClick={() => setIsModalOpen(true)}
            >
              <FiEdit className="inline-block" />
            </button>
          </h1>
          <p className="text-gray-600">Email: {profileData?.email}</p>
          {user.storeName && (
            <p className="text-gray-600">Store: {user.storeName}</p>
          )}
        </div>
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveField}
      />
    </div>
  );
};

export default SellerProfile;