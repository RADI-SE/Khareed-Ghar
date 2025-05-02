import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "../../services/authService";
import { useGetBuyerOrders } from "../../hooks/buyer/Buyer Profile/useGetBuyerOrders";

export const BuyerProfile = () => {

  const navigate = useNavigate();
  const { isAuthenticated, user, isCheckingAuth } = useAuthService();
  const { data: orders = [], isLoading: isLoadingOrders } = useGetBuyerOrders(user?._id);

  if (!isAuthenticated || !user) {
    navigate("/auth/signin");
  }

  return (
    <>
    {isAuthenticated && user &&
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen mb-4">
      <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
        <img
          src={user.profilePicture || "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-gray-300"
        />
        <div className="ml-6">
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Total</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {user.orders?.map((order) => (
                <tr
                  key={order?.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{order?.paymentMethod}</td>
                  <td className="py-3 px-6 text-left">{order?.updatedAt}</td>
                  <td className="py-3 px-6 text-left">{order?.totalAmount}</td>
                  <td className="py-3 px-6 text-left">{order?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default BuyerProfile;