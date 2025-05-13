import React, { useState } from 'react';
import AddCategory from './create/AddCategory';
import EditCategory from './edit/EditCategory';
import DeleteCategory from './delete/DeleteCategory';
import DetailedProductView from './dashboard/view';

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
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 bg-[#10C8B8] rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={currentView === tab.id ? 'bg-[#0eb2a6] text-white w-30 p-2 h-10 rounded-lg' : 'text-white rounded-lg'}
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
            className="border p-2 mt-2 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
          />
        )}
      </nav>

      <div className="view-container">{renderCurrentView()}</div>
    </div>
  );
}

export default CategoryManagement;
