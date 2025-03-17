import React from "react";
import { Link } from "react-router-dom";

const UserCards = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Moderators Card */}
        <Link to="/admin/users/mod" className="transform transition-all duration-300 hover:scale-105">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">Moderators</h3>
              <p className="text-white/90 text-center">Manage moderators and their roles</p>
            </div>
          </div>
        </Link>

        {/* Sellers Card */}
        <Link to="/admin/users/seller" className="transform transition-all duration-300 hover:scale-105">
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">Sellers</h3>
              <p className="text-white/90 text-center">Manage sellers and their roles</p>
            </div>
          </div>
        </Link>

        {/* Buyers Card */}
        <Link to="/admin/users/buyer" className="transform transition-all duration-300 hover:scale-105">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">Buyers</h3>
              <p className="text-white/90 text-center">Manage buyers and their profiles</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserCards;
