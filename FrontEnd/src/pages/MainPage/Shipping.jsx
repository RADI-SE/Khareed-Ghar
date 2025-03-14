import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "../../components/Common/Modal";
import { useNavigate } from "react-router-dom";
import { useFetchAddress } from "../../hooks/buyer/address/useFetchAddress";
import ChangeAddress from "../../components/Common/AddressModal.jsx";
import { useRemoveAddress } from "../../hooks/buyer/address/useRemoveAddress.jsx";

const Shipping = () => {
  const { data, isLoading } = useFetchAddress();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();
  const { mutate: removeAddress } = useRemoveAddress();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
        <p className="text-center">Loading addresses...</p>
      </div>
    );
  }
  const addresses = Array.isArray(data) ? data : data ? [data] : [];
  const handleAddressChange = (newAddress) => {
    setIsModelOpen(false);
    setEditingAddress(newAddress);
    setSelectedAddress(newAddress._id);
  };

  const handleDelete = (addressId) => {
    removeAddress({ addressId });
  };
  const handleProceed = () => {
    if (!selectedAddress) {
      alert("Please select an address before proceeding.");
      return;
    }
    navigate("/cart/checkout");
  };

  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shipping Addresses</h2>
          <button
            onClick={() => {
              setEditingAddress(null);
              setIsModelOpen(true);
              setSelectedAddress(null);
            }}
            className="flex justify-center items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            <FaPlus /> Add New Address
          </button>
        </div>

        {addresses.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No addresses found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max border-collapse">
              <thead className="bg-gray-200 sticky top-0 text-sm">
                <tr>
                  <th className="text-left px-4 py-2">Street</th>
                  <th className="text-left px-4 py-2">State</th>
                  <th className="text-left px-4 py-2">City</th>
                  <th className="text-left px-4 py-2">Phone</th>
                  <th className="text-left px-4 py-2">Actions</th>
                  <th className="text-left px-4 py-2">Select</th>
                </tr>
              </thead>
              <tbody>
                {addresses.map((addr) => (
                  <tr
                    key={addr._id}
                    className={`border-b ${
                      addr._id === selectedAddress ? "bg-blue-100" : ""
                    }`}
                  >
                    <td className="px-4 py-2">{addr.street}</td>
                    <td className="px-4 py-2">{addr.state}</td>
                    <td className="px-4 py-2">{addr.city}</td>
                    <td className="px-4 py-2">{addr.phoneNumber}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setIsModelOpen(true);
                            setSelectedAddress(addr);
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => {
                            handleDelete(addr._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="radio"
                        name="selectedAddress"
                        value={addr._id}
                        checked={selectedAddress === addr._id}
                        onChange={() => setSelectedAddress(addr._id)}
                        className="w-4 h-4"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={handleProceed}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors mt-4"
        >
          Proceed to Payment
        </button>
      </div>

      <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
        <ChangeAddress
          setAddress={handleAddressChange}
          setIsModelOpen={setIsModelOpen}
          initialAddress={editingAddress?.address || ""}
          selectedAddress={selectedAddress}
        />
      </Modal>
    </div>
  );
};

export default Shipping;
