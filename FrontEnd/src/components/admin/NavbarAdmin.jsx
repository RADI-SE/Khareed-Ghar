import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthService } from "../../services/authService";


function NavbarAdmin() {

    const { signout } = useAuthService();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signout();
        navigate("/signin");
      };
  return (
    
        <nav className='fixed top-0 left-0 right-0 bg-white shadow-md z-50'>
            <div className='w-full px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* left side menu */}
                    <div className='flex items-center'>
                        
                    </div>

                    {/* right side menu */}
                    <div className='flex items-center space-x-6'>
                        <button 
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            onClick={handleLogout}
                            >
                            LOGOUT 
                        </button>
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default NavbarAdmin