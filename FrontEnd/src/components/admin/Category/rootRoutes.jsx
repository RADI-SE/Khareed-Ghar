import React, { useState } from 'react';
import AddCategory from './create/AddCategory';
import EditCategory from './edit/EditCategory';
import DeleteCategory from './delete/DeleteCategory';
import DetailedProductView from './dashboard/view';
import './style.css';

function CategoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('category'); 

  const tabs = [
    { id: 'category', label: 'Categories' },
    { id: 'editCategory', label: 'Edit Category' },
    { id: 'addCategory', label: 'Add Category' },
    { id: 'deleteCategory', label: 'Delete Category' },
  ];
  const handleTabChange = (tabId) => {
    setCurrentView(tabId);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'category':
        return <DetailedProductView  />;
      case 'addCategory':
        return <AddCategory />;
      case 'editCategory':
        return <EditCategory />;
      case 'deleteCategory':
        return <DeleteCategory />;
      default:
        return null;
    }
  };

  return (
    <div>
      <nav className="">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 bg-blue-950 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={currentView === tab.id ? 'bg-blue-900 text-white w-40 h-10 rounded-lg' : 'text-white rounded-lg'}
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
            className="block w-full p-4 ps-10 text-sm h-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />
        )}
      </nav>

      <div className="view-container">{renderCurrentView()}</div>
    </div>
  );
}

export default CategoryManagement;
