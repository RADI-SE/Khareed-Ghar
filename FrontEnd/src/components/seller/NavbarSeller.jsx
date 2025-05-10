import React, { useState } from 'react'
import { useAuthService } from "../../services/authService";
import {FaBell, FaCheck} from "react-icons/fa";
import { MdAccountCircle, MdOutlineCancel } from "react-icons/md";
import { Link } from 'react-router-dom'
import { useFetchNotifications } from '../../hooks/seller/Notifications/useFetchNotifications'
import { useSellerService } from '../../services/seller/sellerServices'
import { useNavigate } from 'react-router-dom';

function NavbarSeller() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { signout, user } = useAuthService();
   const navigate = useNavigate(); 
  const {getAuctionStatus} = useSellerService();
  const {updateNotification} = useSellerService();
  const { data = [] } = useFetchNotifications();

  const handleLogout = async () => {
    await signout();
    navigate("/");
  };

  const handleUpdateNotification = async (id) => {
    const read = true;
    await updateNotification(id, read);
  };

    const handleAuctionEnded = async (auctionId,status) => {
      if(status === true){
        await getAuctionStatus(auctionId,true);
      }else{
        await getAuctionStatus(auctionId,false);
      }
    };
    
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
           <div className="flex items-center">
            
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center">
              <h3 className='mb-4 text-lg font-serif font-extrabold leading-none tracking-tight text-gray-900 justify-center items-center pt-4'>Welcome <span className="font-medium text-blue-900 items-center font-serif"> {user?.name || 'User'}</span></h3>
            </div>

            <button 
              onClick={() => navigate("/profile")}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MdAccountCircle className="w-6 h-6 text-blue-900" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              >
                <FaBell className="w-5 h-5 text-blue-900" />
                {data.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {data.length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-[9999]">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {data.map((notification) => (
                      <Link
                        onClick={() => handleUpdateNotification(notification?._id)}
                        key={notification?._id}
                        className={`block no-underline ${notification?.read ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'}`}
                      >
                        <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm text-gray-800">{notification?.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification?.createdAt}</p>
                            </div>
                            
                              {notification?.auctionEnded === true && (
                            <div className="flex space-x-2 ml-2">
                              <button className="p-1 hover:bg-green-100 rounded-full transition-colors" onClick={() => handleAuctionEnded(notification?.auction,true)}>
                                <FaCheck className="w-4 h-4 text-green-600"/>
                              </button>
                              <button className="p-1 hover:bg-red-100 rounded-full transition-colors" onClick={() => handleAuctionEnded(notification?.auction,false)}>
                                <MdOutlineCancel className="w-4 h-4 text-red-600"/>
                              </button>
                            </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {data.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                      No new notifications
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Logout Button */}
            <div>
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarSeller