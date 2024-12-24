import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = ({ setOrder }) => {
  const [billingToggle, setBillingToggle] = useState(true);
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");


  const [totalPrice, setTotalPrice] = useState(0);

  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const setPriceHandler = () => {
    let newTotal = 0;
    cart.products.forEach((product) => {
      newTotal += product.price * product.quantity;
    });
    setTotalPrice(newTotal);
  };

  useEffect(() => {
    setPriceHandler();
  }, [cart.products]);

  const handleOrder = () => {
    const newOrder = {
      products: cart.products,
      orderNumber: "12345",
      totalPrice: totalPrice,
    };
    setOrder(newOrder);
    navigate("/order-confirmation");
  };

  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      <h3 className="text-2xl font-semibold mb-4">CHECKOUT</h3>
      <div className="flex flex-col w-[1000px] md:flex-row justify-between space-x-10 mt-8">
        <div className="md:w-2/3">
          <div className="border p-2 mb-6">
            <div
              className="flex items-center justify-between"
              onClick={() => setPaymentToggle(!paymentToggle)}
            >
              <h3 className="text-lg font-semibold mb-2">
                Payment Information
              </h3>
              {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div className={`space-y-4 ${paymentToggle ? "" : "hidden"}`}>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="payment"
                  className="w-full px-3 py-2 border"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <label className="block text-gray-700">Cash on Delivery</label>
              </div>

              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="payment"
                  className="w-full px-3 py-2 border"
                  checked={paymentMethod === "dc"}
                  onChange={() => setPaymentMethod("dc")}
                />
                <label className="block text-gray-700">Debit Card</label>
              </div>

              {paymentMethod === "dc" && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold mb-4">
                    Debit Card Information
                  </h3>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Account Number
                    </label>
                    <input
                      type="text"
                      placeholder="Account Number"
                      className="border p-2 w-full rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Account Title"
                      className="border p-2 w-full rounded"
                    />
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="mb-4">
                      <label
                        htmlFor=""
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Card CVV
                      </label>
                      <input
                        type="text"
                        placeholder="CVV"
                        className="border p-2 w-full rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor=""
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Card Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="border p-2 w-full rounded"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {cart.products.map((product) => (
              <div key={product.id} className="flex justify-between">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt=""
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="ml-4">
                    <h4 className="text-md font-semibold">{product.name}</h4>
                    <p className="text-gray-600">
                      ${product.price} x {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-gray-800">
                  ${product.price * product.quantity}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between">
              <span>Total Price</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
