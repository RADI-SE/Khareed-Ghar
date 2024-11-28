import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Ensure styles are correct

const UserCards = () => {
  return (
    <div className="container">
      <div className="card-grid">
         
        <Link className="card-link" to="/admin/users/mod">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title">Moderators</h3>
              <p className="card-description">Manage moderators and their roles.</p>
            </div>
          </div>
        </Link>

        <Link className="card-link" to="/admin/users/seller">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title">Sellers</h3>
              <p className="card-description">Manage sellers and their roles.</p>
            </div>
          </div>
        </Link>
        
        <Link className="card-link" to="/admin/users/buyer">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title">Buyers</h3>
              <p className="card-description">Manage buyers and their profiles.</p>
            </div>
          </div>
        </Link>
        
      </div>
    </div>
  );
};

export default UserCards;
