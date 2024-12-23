export const getSelectedItemName = (Items, selectedItemId) => {
    return Items.find((item) => item._id === selectedItemId)?.name.trim();
  };
  
  export const isValidConfirmationName = (confirmationName, selectedItemName) => {
    return confirmationName.trim() === selectedItemName;
  };
  