import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useAddAddress } from '../../hooks/buyer/address/useAddAddress';
import { useFetchRegion } from '../../hooks/admin/Region/useFetchRegion';
import { useEditAddress } from '../../hooks/buyer/address/useEditAddress';
const ChangeAddress = ({ setAddress, setIsModelOpen, selectedAddress }) => {
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const [street, setStreet] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cities, setCities] = useState([]);
  const { data: region = { locations: [] } } = useFetchRegion();
  const { mutate: createLocation } = useAddAddress();
  const { mutate: updateAddress } = useEditAddress();

  // Populate form fields if selectedAddress is provided
  useEffect(() => {
    if (selectedAddress) {
      setStreet(selectedAddress.street || '');
      setStateName(selectedAddress.state || '');
      setCityName(selectedAddress.city || '');
      setPhoneNumber(selectedAddress.phoneNumber || '');
      setCityId(selectedAddress.cityId || '');
      setStateId(selectedAddress.stateId || '');
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (stateName) {
      const selectedLocations = region.locations?.filter((location) => location.state === stateName);
      const selectedCities = selectedLocations.map((location) => location.city);  
      setCities(selectedCities || []);
      if (selectedLocations.length > 0) {
        setStateId(selectedLocations[0]._id);
        setCityId(selectedLocations[0]._id);
      }
    }
  }, [stateName, region]);

  const onClose = async () => {
    if (!street || !stateName || !cityName || !phoneNumber) {
      alert('Please fill all fields before saving.');
      return;
    }
    try {
      if(selectedAddress){
        updateAddress({
          id: selectedAddress._id,
          street,
          state: stateId,
          city: cityId,
          phoneNumber,
        });
      }else{
        createLocation({
          street,
          state: stateId,
          city: cityId,
          phoneNumber,
      });
      setAddress(`${street}, ${stateName}, ${cityName}, ${phoneNumber}`);
      setIsModelOpen(false);

    }
   } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address.');
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Street address"
        className="border p-2 w-full mb-4"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <select
        className="border p-2 w-full mb-4"
        value={stateName}
        onChange={(e) => setStateName(e.target.value)}
      >
        <option value="">Select State</option>
        {region.locations?.map((location) => (
          <option key={location._id} value={location.state}>
            {location.state}
          </option>
        ))}
      </select>

      {stateName && (
        <select
          className="border p-2 w-full mb-4"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      )}

      <input
        type="text"
        placeholder="Phone number"
        className="border p-2 w-full mb-4"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          onClick={() => setIsModelOpen(false)}
        >
          Cancel
        </button>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

ChangeAddress.propTypes = {
  setAddress: PropTypes.func.isRequired,
  setIsModelOpen: PropTypes.func.isRequired,
  selectedAddress: PropTypes.object.isRequired, 

};

export default ChangeAddress;
