import { useMutation } from "@tanstack/react-query";
import { useCartService } from "../../../services/buyer/buyerServices";

export const useAddToCart = () => {
  const { addToCart } = useCartService();
  return useMutation({
    mutationFn: async ({  productId, quantity }) => {
      try {
        const response = await addToCart( productId, quantity);
        return response;
      } catch (error) {
        console.error("Error during addToCart API call:", error);
        throw error;
      }
    },

  });
};
