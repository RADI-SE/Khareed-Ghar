import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../../services/buyer/adminServices";

export const useAddToCart = () => {
  const { addToCart } = useAdminService();
  return useMutation({
    mutationFn: async ({ id, productId, quantity }) => {
      try {
        const response = await addToCart(id, productId, quantity);
        return response;
      } catch (error) {
        console.error("Error during addToCart API call:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Product added to cart successfully:", data);
    },
    onError: (error) => {
      console.error("Error encountered while adding product to cart:", error.message);
    },
  });
};
