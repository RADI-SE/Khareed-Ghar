import React, { useState } from "react";

const fields = {
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

export const EditModal = ({ isOpen, onClose, onSave }) => {
  const [selectedField, setSelectedField] = useState("");
  const [fieldValue, setFieldValue] = useState("");

  const handleSave = () => {
    onSave(selectedField, fieldValue);
    setSelectedField("");
    setFieldValue("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        <select
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <option value="">Select Field to Edit</option>
          {Object.entries(fields).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        {selectedField && (
          <input
            type={selectedField.toLowerCase().includes("password") ? "password" : "text"}
            className="w-full border border-gray-300 rounded p-2 mb-4"
            placeholder={`Enter new ${fields[selectedField]}`}
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
        )}

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