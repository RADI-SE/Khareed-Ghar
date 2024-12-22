import React from "react";
import { Link } from "react-router-dom";

const UserCards = () => {
  return (
    <div className="grid grid-rows-1">
      <div className="">
        <Link
          className="no-underline text-white row-span-1"
          to="/admin/users/mod"
        >
          <div className=" h-40 text-center bg-blue-300 rounded-lg p-5 mb-3">
            <h3 className="card-title">Moderators</h3>
              <p>
                Manage moderators and their roles.
              </p>
          </div>
        </Link>

        <Link
          className="no-underline text-white row-span-1 "
          to="/admin/users/seller"
        >
          <div className="item-center h-40 text-center bg-green-300 rounded-lg p-5 mb-3">
            <h3 className="card-title">Sellers</h3>
            <p>Manage sellers and their roles.</p>
          </div>
        </Link>

        <Link
          className="no-underline text-white row-span-1"
          to="/admin/users/buyer"
        >
          <div className="item-center h-40 text-center bg-yellow-300 rounded-lg p-5 mb-3">
            <h3 className="card-title">Buyers</h3>
            <p>
              Manage buyers and their profiles.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserCards;
