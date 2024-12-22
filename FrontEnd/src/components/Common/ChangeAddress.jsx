import React, { useState } from "react";
import { useAddAddress } from "../../hooks/buyer/address/useAddAddress";

const ChangeAddress = ({ setAddress, setIsModelOpen }) => {
  const [addressDetails, setAddressDetails] = useState({
    country: "",
    city: "",
    sector: "",
    streetNumber: "",
    houseNumber: "",
  });

  const { mutate: AddToCart } = useAddAddress();

  const onClose = () => { 

    const userId = "123"; 
    const userName = "John Doe";
    const phone = "1234567890"; 
    const LOCATION = `${addressDetails.country}, ${addressDetails.city}`; 
    const state = "StateName";
    const area = addressDetails.sector;
    const postalCode = "12345"; 

    AddToCart({
      userId,
      userName,
      phone,
      LOCATION,
      state,
      area,
      postalCode,
      addressDetails,
    });

    setAddress(`${addressDetails.houseNumber}, ${addressDetails.streetNumber}, ${addressDetails.sector}, ${addressDetails.city}, ${addressDetails.country}`);
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
        <select
          className="border p-2 w-full mb-4"
          value={addressDetails.country}
          onChange={(e) => handleChange("country", e.target.value)}
        >
          <option value="" disabled>
            Select Country
          </option>
          <option value="Pakistan">Pakistan</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
        </select>

        <select
          className="border p-2 w-full mb-4"
          value={addressDetails.city}
          onChange={(e) => handleChange("city", e.target.value)}
        >
          <option value="" disabled>
            Select City
          </option>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
        </select>
        <input
          type="text"
          placeholder="Type phone number"
          className="border p-2 w-full mb-4"
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type address"
          className="border p-2 w-full mb-4"
          onChange={(e) => setNewAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="Type city name"
          className="border p-2 w-full mb-4"
          onChange={(e) => setNewAddress(e.target.value)}
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
