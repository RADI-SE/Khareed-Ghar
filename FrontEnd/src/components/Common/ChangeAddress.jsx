import React, { useState } from "react";
import { useAddAddress } from "../../hooks/buyer/address/useAddAddress";

const ChangeAddress = ({ setAddress, setIsModelOpen }) => {
  const [addressDetails, setAddressDetails] = useState({
    street: "",
    state: "",
    city: "",
    phoneNumber: "",
  });
  const id = sessionStorage.getItem("id");

  const { mutate: createLocation } = useAddAddress();

  const validateFields = () => {
    const { street, state, city, phoneNumber } = addressDetails;

    if (!street.trim()) {
      alert("Street address is required.");
      return false;
    }
    if (!state.trim()) {
      alert("State is required.");
      return false;
    }
    if (!city.trim()) {
      alert("City is required.");
      return false;
    }
    if (!phoneNumber.trim()) {
      alert("Phone number is required.");
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Phone number must be 10 digits.");
      return false;
    }

    return true;
  };
  const onClose = () => {
    const userName = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    const phone = `${addressDetails.street}`;
    const LOCATION = `${addressDetails.state}, ${addressDetails.city}`;
    const phoneNumber = `${addressDetails.phoneNumber}`;
    // createLocation({
    //   userId: id,
    //   userName,
    //   phone,
    //   LOCATION,
    //   state,
    //   area,
    //   postalCode,
    //   addressDetails,
    // });
    if (!validateFields()) return;
    setAddress(
      `${addressDetails.street}, ${addressDetails.state}, ${addressDetails.city}, ${addressDetails.phoneNumber}`
    );
    setIsModelOpen(false);
  };

  const handleChange = (field, value) => {
    setAddressDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Street address"
          className="border p-2 w-full mb-4"
          onChange={(e) => handleChange("street",e.target.value)}
        />

        <select
          className="border p-2 w-full mb-4"
          value={addressDetails.state}
          onChange={(e) => handleChange("state",e.target.value)}
        >
          <option value="" disabled>
            Select State
          </option>
          <option value="Pakistan">Punjab</option>
          <option value="Saudi Arabia">Islamabad</option>
        </select>

        <select
          className="border p-2 w-full mb-4"
          value={addressDetails.city}
          onChange={(e) => handleChange("city", e.target.value)}
        >
          <option value="" disabled>
            Select City
          </option>
          <option value="Islamabad">Islamabad</option>
        </select>

        <input
          type="text"
          placeholder=" Phone number"
          className="border p-2 w-full mb-4"
          onChange={(e) => handleChange("phoneNumber",e.target.value)}
        />

        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-y py-2 px-4 rounded mr-2"
            onClick={() => setIsModelOpen(false)}
          >
            Cancel
          </button>

          <button
            className="bg-gray-500 text-y py-2 px-4 rounded"
            onClick={onClose}
          >
            Save Address
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangeAddress;
