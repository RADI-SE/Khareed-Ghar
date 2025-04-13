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
        await updateAddress({
          id: selectedAddress._id,
          street,
          state: stateId,
          city: cityId,
          phoneNumber,
        });
      } else {
        await createLocation({
          street,
          state: stateId,
          city: cityId,
          phoneNumber,
        });
      }
      setAddress(`${street}, ${stateName}, ${cityName}, ${phoneNumber}`);
      setIsModelOpen(false);
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-2">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-6">
        {selectedAddress ? 'Edit Address' : 'Add New Address'}
      </h2>
      
      <div className="space-y-2 sm:space-y-6">
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            id="street"
            type="text"
            placeholder="Enter your street address"
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
 
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <select
            id="state"
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
        </div>

        {stateName && (
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <select
              id="city"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
          </div>
        )}

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Enter your phone number"
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
          <button
            className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            onClick={() => setIsModelOpen(false)}
          >
            Cancel
          </button>
          <button
            className="w-full sm:w-auto px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            onClick={onClose}
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

ChangeAddress.propTypes = {
  setAddress: PropTypes.func.isRequired,
  setIsModelOpen: PropTypes.func.isRequired,
  selectedAddress: PropTypes.object
};

export default ChangeAddress;
