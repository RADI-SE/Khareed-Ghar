// import React from 'react' // Removed unused import

function Review() {
    return (
      <div className="font-sans bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-md bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl text-gray-800 mb-6">Review</h1>
          <div className="mb-5">
            <h2 className="text-2xl text-gray-700 font-semibold mb-3">Order Summary</h2>
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-medium text-gray-600 mb-2">Items</h3>
              <p className="text-gray-500">Your cart is empty. <a href="#" className="text-blue-500 hover:underline">Add items to your order</a>.</p>
            </div>
          </div>
          <div className="mb-5">
            <h2 className="text-2xl text-gray-700 font-semibold mb-3">Shipping Address</h2>
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-medium text-gray-600 mb-2">Address</h3>
              <p className="text-gray-500">123 Main St, Anytown, USA</p>
            </div>
          </div>
          <div className="mb-5">
            <h2 className="text-2xl text-gray-700 font-semibold mb-3">Payment Method</h2>
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-medium text-gray-600 mb-2">Payment Method</h3>
              <p className="text-gray-500">Visa ending in 1234</p>
            </div>
          </div>
          <button className="block w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition">
            Confirm Order
          </button>
        </div>
      </div>
    )
  }
  
  export default Review
