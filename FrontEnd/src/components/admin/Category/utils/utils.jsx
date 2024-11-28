export const getSelectedCategoryName = (categories, selectedCategoryId) => {
    return categories.find((cat) => cat._id === selectedCategoryId)?.name.trim();
  };
  
  export const isValidConfirmationName = (confirmationName, selectedCategoryName) => {
    return confirmationName.trim() === selectedCategoryName;
  };
  