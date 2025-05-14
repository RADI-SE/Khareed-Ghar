import  { useState } from "react";
import { useProfileInfo } from "../../hooks/Users/useProfileInfo";

const sellerFields = {
  name: "Name",
  email: "Email",
  password: "Password",
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
  password: "Password"
};

export const EditModal = ({ isOpen, onClose, onSave }) => {
  const [selectedField, setSelectedField] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { data } = useProfileInfo();

  const handleSave = () => {
    if (selectedField === "password") {
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match!");
        return;
      }
      onSave(selectedField, { oldPassword, newPassword });
    } else {
      onSave(selectedField, fieldValue);
    }
    setSelectedField("");
    setFieldValue("");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  if (!isOpen) return null;

  const fields = data?.role === 'seller' || data?.role === 'Seller' ? sellerFields : BuyerFields;

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
          <>
            {selectedField === "password" ? (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </>
            ) : (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current {fields[selectedField]}
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
          </>
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