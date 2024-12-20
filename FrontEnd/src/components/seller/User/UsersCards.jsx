import React from 'react';
import { Link } from 'react-router-dom';
// import './style.css'; // Ensure styles are correct

const UserCards = () => {
  return (
    <div className="grid grid-rows-1">
      <div className="">
         
        <Link className="no-underline text-white row-span-1" to="/seller/users/mod">
          <div className="item-center h-40 text-center bg-blue-300 rounded-lg p-5 mb-3">
             <h3 className="">Moderators</h3>
             <span className="">Manage moderators and their roles.</span>
          </div>
        </Link>

        <Link className="no-underline text-white row-span-1 " to="/seller/users/seller">
          <div className="item-center h-40 text-center bg-green-300 rounded-lg p-5 mb-3">
             <h3 className="">Seller</h3>
             <span>Manage sellers and their roles.</span>
          </div>
        </Link>

        <Link className="no-underline text-white row-span-1" to="/seller/users/buyer">
          <div className="item-center h-40 text-center bg-yellow-300 rounded-lg p-5 mb-3">
             <h3 className="">Buyer</h3>
             <span className="">Manage buyers and their status.</span>
          </div>
        </Link>
        
      </div>
    </div>
  );
};

export default UserCards;
