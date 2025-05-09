import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useCartService } from "../../services/buyer/buyerServices";
import { useAddressService } from "../../services/buyer/buyerServices";
import { useOrderService } from "../../services/orderServices";

const Checkout = () => {
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart } = useCartService();
  const {getSelectedLocation } = useAddressService();
  const { createOrder } = useOrderService(); 
  const selectedLocation = getSelectedLocation();
  
  useEffect(() => {
    if (cart?.items) {
      const newTotal = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,0
      );
      setTotalPrice(newTotal);
    }
  }, [cart?.items]);

  const handleOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method before placing your order.");
      return;
    }
    if(cart?.items?.length === 0){
      alert("Please add some items to your cart before placing your order.");
      return;
    }
    if(!selectedLocation){
      alert("Please select a shipping location before placing your order.");
      return;
    }
    await createOrder(cart._id, selectedLocation._id, paymentMethod.toUpperCase());
  };

  return (
    <div className="container mx-auto py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12 min-h-screen">
      <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Checkout</h3>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Payment Information Section */}
        <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 rounded-lg shadow-md sm:shadow-lg border mb-6 lg:mb-0">
          <div
            className="border-b pb-3 sm:pb-4 mb-3 sm:mb-4 cursor-pointer flex items-center justify-between text-base sm:text-lg font-semibold text-gray-700"
            onClick={() => setPaymentToggle(!paymentToggle)}
          >
            <span>Payment Information</span>
            {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
          </div>

          {paymentToggle && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="w-4 h-4 text-blue-600"
                />
                <label className="text-gray-700">Cash on Delivery</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "CREDIT CARD"}
                  onChange={() => setPaymentMethod("CREDIT CARD")}
                  className="w-4 h-4 text-blue-600"
                />
                <label className="text-gray-700">Credit Card</label>
              </div>

              {paymentMethod === "CREDIT CARD" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                    Credit Card Information
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Account Number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Card Holder Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-md sm:shadow-lg border">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max border-collapse">
                <thead className="bg-gray-50 sticky top-0 text-xs sm:text-sm">
                  <tr>
                    <th className="text-left px-2 sm:px-4 py-2">Product</th>
                    <th className="text-left px-2 sm:px-4 py-2">Price</th>
                    <th className="text-left px-2 sm:px-4 py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm">
                  {cart?.items?.map((item) => (
                    <tr key={item._id} className="border-t border-gray-100">
                      <td className="px-2 sm:px-4 py-2">
                        {item.product?.name}
                      </td>
                      <td className="px-2 sm:px-4 py-2">${item.price}</td>
                      <td className="px-2 sm:px-4 py-2">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 border-t pt-4 flex justify-between text-base sm:text-lg font-semibold">
            <span>Total Price</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handleOrder}
            className="mt-4 sm:mt-6 w-full py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md sm:rounded-lg transition-colors duration-200"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
