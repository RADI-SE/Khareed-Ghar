import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../../services/buyer/adminServices";

// useRemoveFromCart Hook
export const useRemoveFromCart = () => {
  const { removeFromCart } = useAdminService();

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
