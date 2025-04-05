import { useMutation } from "@tanstack/react-query";
import { useCartService } from "../../../services/buyer/buyerServices";

// useRemoveFromCart Hook
export const useRemoveFromCart = () => {
  const { removeFromCart } = useCartService();

  return useMutation({
    mutationFn: ({ productId }) => removeFromCart( productId),
  
  });
};
