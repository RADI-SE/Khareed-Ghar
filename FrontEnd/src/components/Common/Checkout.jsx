import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCartService } from "../../services/buyer/buyerServices";

const Checkout = () => {
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart } = useCartService();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart?.items) {
      const newTotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(newTotal);
    }
  }, [cart?.items]);

  const handleOrder = () => {
    navigate("/order-confirmation");
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-16 lg:px-24 min-h-screen">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h3>
      <div className="flex flex-col md:flex-row md:space-x-10">
         
        <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-lg border">
          <div 
            className="border-b pb-4 mb-4 cursor-pointer flex items-center justify-between text-lg font-semibold text-gray-700"
            onClick={() => setPaymentToggle(!paymentToggle)}
          >
            <span>Payment Information</span>
            {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
          </div>

          {paymentToggle && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                <label className="text-gray-700">Cash on Delivery</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="payment" checked={paymentMethod === "dc"} onChange={() => setPaymentMethod("dc")} />
                <label className="text-gray-700">Debit Card</label>
              </div>

              {paymentMethod === "dc" && (
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Debit Card Information</h3>
                  <input type="text" placeholder="Account Number" className="border p-2 w-full rounded mb-4" />
                  <input type="text" placeholder="Card Holder Name" className="border p-2 w-full rounded mb-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="CVV" className="border p-2 w-full rounded" />
                    <input type="text" placeholder="MM/YY" className="border p-2 w-full rounded" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>


        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg border mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
          <div className="max-h-64 overflow-y-auto border rounded-md">
          <table className="w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0">
                <tr>
                  <th className="text-left px-4 py-2 ">Product</th>
                  <th className="text-left px-4 py-2">Price</th>
                  <th className="text-left px-4 py-2">Quantity</th>
                  {/* <th>Total</th> */}
                </tr>
              </thead>
              <tbody>
                {cart?.items?.map((item) => (
                  <tr key={item._id}>
                    <td className="text-center px-4 py-2">{item.product?.name}</td>
                    <td className="text-center px-4 py-2">${item.price}</td>
                    <td className="text-center px-4 py-2">{item.quantity}</td>
                    {/* <td>${(item.price * item.quantity).toFixed(2)}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
          <div className="mt-4 border-t pt-4 flex justify-between text-lg font-semibold">
            <span>Total Price</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button onClick={handleOrder} className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
