import React, { useState } from 'react';
import data from '../../../mockJsons/productData.json';
import AddProduct from './create/view';
import EditCategory from './edit/EditCategory';
import DeleteCategory from './delete/DeleteCategory';
import DetailedProductView from './dashboard/view';
import './style.css';

function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('category'); 

  const tabs = [
    { id: 'category', label: 'Categories' },
    { id: 'editCategory', label: 'Edit Category' },
    { id: 'addProduct', label: 'Add Product' },
    { id: 'deleteCategory', label: 'Delete Category' },
  ];
  const handleTabChange = (tabId) => {
    setCurrentView(tabId);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'category':
        return <DetailedProductView searchTerm={searchTerm} />;
      case 'addProduct':
        return <AddProduct />;
      case 'editCategory':
        return <EditCategory />;
      case 'deleteCategory':
        return <DeleteCategory categories={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="product-management">
      <nav className="navbar">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={currentView === tab.id ? 'active-tab' : ''}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {currentView === 'category' && (
          <input
            type="text"
            placeholder="Search by ID"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="search-bar"
          />
        )}
      </nav>

      <div className="view-container">{renderCurrentView()}</div>
    </div>
  );
}

export default ProductManagement;
