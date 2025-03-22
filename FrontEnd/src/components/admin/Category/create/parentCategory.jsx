import React, { useState, useEffect } from "react";
import { useCreateCategory } from "../../../../hooks/Categories/useCreateCategory";
import { useAdminService } from "../../../../services/adminServices";

export const AddCategoryForm = () => {
  const [name, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const token = sessionStorage.getItem("token");
  const { errorMessage, setError, clearError, isError } = useAdminService();
  const { setSuccess, clearSuccess, isSuccess } = useAdminService();

  useEffect(() => {
    if (isSuccess) {
      setSuccess();
      const timer = setTimeout(() => clearSuccess(), 2000);
      return () => clearTimeout(timer);  
    }
  }, [isSuccess, setSuccess, clearSuccess]);

  useEffect(() => {
    if (isError) {
      setError(errorMessage);
      const timer = setTimeout(() => clearError(), 2000);
      return () => clearTimeout(timer);  
    }
  }, [isError, errorMessage, setError, clearError]);
  
  const {
    mutate: createCategory,
    isLoading: isCreating,
  } = useCreateCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createCategory({
      token,
      name,
      description,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Add Category</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter category description"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
 

          <div>
            <button
              type="submit"
              disabled={isCreating}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${isCreating 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
            >
              {isCreating ? "Adding..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
