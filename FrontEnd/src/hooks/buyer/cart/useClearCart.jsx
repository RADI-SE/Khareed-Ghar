import { useMutation } from "@tanstack/react-query";
import { useCartService } from "../../../services/buyer/buyerServices";

export const useClearCart = () => {
  const { clearCart } = useCartService();

  return useMutation({
    mutationFn: clearCart, // No need for async wrapper, since clearCart already returns a promise
    onSuccess: (data) => {
      console.log("Cart cleared successfully:", data);
      // You can also add cache invalidation or UI updates here if needed
    },
    onError: (error) => {
      console.error("Error clearing cart:", error);
      // Optionally, you can show an error toast message here
    },
  });
};
