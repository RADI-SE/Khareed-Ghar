import { useMutation } from "@tanstack/react-query";
import { useCartService } from "../../../services/buyer/buyerServices";

export const useClearCart = (id) => {
  const { clearCart } = useCartService();
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await clearCart(id);
        return response;
      } catch (error) {
        throw error;
      }
    },
  });
};
