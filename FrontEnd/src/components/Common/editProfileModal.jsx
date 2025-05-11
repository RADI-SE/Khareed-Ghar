import React, { useState } from "react";
import { useProfileInfo } from "../../hooks/Users/useProfileInfo";


const sellerFields = {
  name: "Name",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",
  storeName: "Store Name",
  isStore: "Is Store",
  businessType: "Business Type",
  storeTagline: "Store Tagline",
  physicalStoreAddress: "Physical Address",
  phoneNumber: "Phone Number",
  bankAccountNumber: "Bank Account Number",
  bankName: "Bank Name"
};

const BuyerFields = {
  name: "Name",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password"
};


export const EditModal = ({ isOpen, onClose, onSave }) => {
  const [selectedField, setSelectedField] = useState("");
  const [fieldValue, setFieldValue] = useState("");
   const { data } = useProfileInfo();
  const handleSave = () => {
    onSave(selectedField, fieldValue);
    setSelectedField("");
    setFieldValue("");
    onClose();
  };

  console.log("Data in EditModal", data);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      {data.role === 'seller' || 'Seller' ? (
        <select
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <option value="">Select Field to Edit</option>
          {Object.entries(sellerFields).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      ) : (
        <select
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <option value="">Select Field to Edit</option>
          {Object.entries(BuyerFields).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      )}
      
        

        
{selectedField &&  (
  <>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Current Name
    </label>
    <div className="w-full border border-gray-300 rounded p-2 mb-4 bg-gray-100 text-gray-700">
      {data?.[selectedField] || "No data found"}

    </div>

    <input
      type="text"
      className="w-full border border-gray-300 rounded p-2 mb-4"
      placeholder={`Enter new ${fields[selectedField]}`}
      value={fieldValue}
      onChange={(e) => setFieldValue(e.target.value)}
    />
  </>
)}



{/* 
        {selectedField &&  (
          <input
            type={selectedField.toLowerCase().includes("password") ? "password" : "text"}
            className="w-full border border-gray-300 rounded p-2 mb-4"
            placeholder={`Enter new ${fields[selectedField]}`}
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
        )} */}

        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 text-gray-700 border rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditModal;