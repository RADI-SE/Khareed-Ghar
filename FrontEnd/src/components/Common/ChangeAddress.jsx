import React, { useState } from "react";
import { useAddAddress } from "../../hooks/buyer/address/useAddAddress";
import { useFetchRegion } from "../../hooks/admin/Region/useFetchRegion";

const ChangeAddress = ({ setAddress, setIsModelOpen }) => {
  const [addressDetails, setAddressDetails] = useState({
    street: "",
    state: "",
    city: "",
    phoneNumber: "",
  });

  const [cityId, setCityId] = useState();
  const { data: region = [] } = useFetchRegion();
 
  const userId = sessionStorage.getItem("id");

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
    if (!validateFields()) return;
    createLocation({
      userId,
      street: addressDetails.street,
      LOCATION: cityId,
      phoneNumber: addressDetails.phoneNumber,
    });
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
          onChange={(e) => handleChange("street", e.target.value)}
        />
        <select
          className="border p-2 w-full mb-4"
          value={addressDetails.state}
          onChange={(e) => handleChange("state", e.target.value)}
        >
          <option value="">Select State</option>
          {region.locations?.map((region) => (
            <option key={region._id} value={region.state}>
              {region.state}
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full mb-4"
          value={addressDetails.city}
          onChange={(e) => {
            const selectedRegion = region.locations.find(
              (region) =>
                region.city === e.target.value &&
                region.state === addressDetails.state
            );
            handleChange("city", e.target.value); 
            setCityId(selectedRegion?._id); 
          }}
        >
          <option value="">Select City</option>
          {region.locations
            ?.filter((region) => region.state === addressDetails.state)
            .map((region) => (
              <option key={region._id} value={region.city}>
                {region.city}
              </option>
            ))}
        </select>

        <input
          type="text"
          placeholder=" Phone number"
          className="border p-2 w-full mb-4"
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
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
