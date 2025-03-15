import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFetchCartItems } from "../../hooks/buyer/cart/useFetchCartItems";
import { useRemoveFromCart } from "../../hooks/buyer/cart/useRemoveFromCart";
import { useAuthService } from "../../services/authService";

const Cart = () => {
  const navigate = useNavigate();
  const { data: cart = {} } = useFetchCartItems();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { isAuthenticated, user, isCheckingAuth } = useAuthService();

  const items = cart.items || [];
  const totalAmount = cart.totalAmount || 0;

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  const handleCheckOut = (e) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      navigate("/auth/signin");
    } else {
      navigate("shipping");
    }
  };

  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      {items?.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Shopping Cart</h3>
          <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-10 mt-8">
            <div className="md:w-2/3">
              <div className="flex justify-between border-b item-center mb-4 text-xs font-bold">
                <div className="max-h-80 overflow-y-auto border rounded-md w-full">
                 
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-max border-collapse">
                      <thead className="bg-gray-200 sticky top-0 text-sm">
                        <tr>
                          <th className="text-left px-4 py-2">Product</th>
                          <th className="text-left px-4 py-2">Name</th>
                          <th className="text-left px-4 py-2">Price</th>
                          <th className="text-left px-4 py-2">Quantity</th>
                          <th className="text-left px-4 py-2">Sub-Total</th>
                          <th className="text-left px-4 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm md:text-base">
                        {items?.map(({ product, quantity, total, _id }) => (
                          <tr key={_id} className="text-center">
                            <td className="px-4 py-2">
                              <img
                                src="https://via.placeholder.com/100"
                                alt={product?.name}
                                className="w-16 h-16 md:w-20 md:h-20 object-contain rounded"
                              />
                            </td>
                            <td className="px-4 py-2 font-semibold">
                              {product?.name}
                            </td>
                            <td className="px-4 py-2 font-semibold">
                              ${product?.price}
                            </td>
                            <td className="px-4 py-2 font-semibold">{quantity}</td>
                            <td className="px-4 py-2 font-semibold">${total}</td>
                            <td className="px-4 py-2">
                              <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() =>
                                  removeFromCart({ productId: product._id })
                                }
                              >
                                <FaTrashAlt />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-sm font-semibold mb-5">Summary</h3>
              <div className="flex justify-between mb-5 border-b pb-1">
                <span className="text-sm">Total Items</span>
                <span>{items.length}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Total Price:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <button
                className="w-full bg-blue-900 text-white py-2 hover:bg-blue-700 rounded-md"
                onClick={handleCheckOut}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <img
            className="h-96"
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png?f=webp"
            alt="Cart is Empty"
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
