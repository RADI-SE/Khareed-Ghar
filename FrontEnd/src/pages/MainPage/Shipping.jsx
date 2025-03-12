import { useState } from 'react';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import Modal from '../../components/Common/Modal';
import ChangeAddress from '../../components/Common/ChangeAddress';
import { useNavigate } from 'react-router-dom';
import { useFetchAddress } from '../../hooks/buyer/address/useFetchAddress';

const Shipping = () => {
  const { data, isLoading, error, refetch } = useFetchAddress();
 
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
        <p className="text-center">Loading addresses...</p>
      </div>
    );
  }

 

   console.log('Data structure:', data);

   const addresses = Array.isArray(data) ? data : data ? [data] : [];
   console.log('Processed addresses:', addresses);

  const handleAddressChange = async (newAddress) => {
    if (editingAddress) {
      console.log("editingAddress", editingAddress);

    } else {
      console.log("newAddress", newAddress);
    }
    setIsModelOpen(false);
    setEditingAddress(null);
  };

  return (
    <div className='container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24'>
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Shipping Addresses</h2>
          <button
            onClick={() => {
              setEditingAddress(null);
              setIsModelOpen(true);
            }}
            className='flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors'
          >
            <FaPlus /> Add New Address
          </button>
        </div>

        {addresses.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No addresses found</p>
        ) : (
          addresses.map((addr) => (
            <div 
              key={addr._id}
              className={`p-4 border rounded-md mb-4 ${addr.isDefault ? 'border-blue-500' : 'border-gray-200'}`}
            >
              <div className='flex justify-between items-start'>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-gray-600">Street: </span>
                    <span className="text-sm">{addr.street}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">State: </span>
                    <span className="text-sm">{addr.state}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">City: </span>
                    <span className="text-sm">{addr.city}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Phone: </span>
                    <span className="text-sm">{addr.phoneNumber}</span>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => {
                      setEditingAddress(addr);
                      setIsModelOpen(true);
                    }}
                    className='text-gray-600 hover:text-blue-600'
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
        <ChangeAddress 
          setAddress={handleAddressChange} 
          setIsModelOpen={setIsModelOpen}
          initialAddress={editingAddress?.address || ''}
        />
      </Modal>
    </div>
  );
};

export default Shipping; 
