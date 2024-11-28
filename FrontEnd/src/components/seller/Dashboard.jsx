import React from 'react';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  return (
    <div className="main-content">
      <h2>Dashboard Overview</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Sales</h5>
              <p className="card-text">$10,000</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Active Users</h5>
              <p className="card-text">150</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Top Product</h5>
              <p className="card-text">Product A</p>
            </div>
          </div>
        </div>
        <Link to="buyer">buy</Link>
      </div>
    </div>
  );
};
export default Dashboard;