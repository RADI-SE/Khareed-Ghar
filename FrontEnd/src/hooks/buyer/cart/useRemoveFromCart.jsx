import { useMutation } from "@tanstack/react-query";
import { useCartService } from "../../../services/buyer/buyerServices";

// useRemoveFromCart Hook
export const useRemoveFromCart = () => {
  const { removeFromCart } = useCartService();

  return useMutation({
    mutationFn: ({ id, productId }) => removeFromCart(id, productId),
    
    onSuccess: () => {
      console.log("Product removed from cart successfully.");
    },

    onError: (error) => {
      console.error(
        "Failed to remove product from cart: ",
        error?.response?.data?.message || "An unexpected error occurred."
      );
    },
  });
};
