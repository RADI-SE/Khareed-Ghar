import { useMutation } from "@tanstack/react-query";
import { useCartService } from "../../../services/buyer/buyerServices";

export const useClearCart = () => {
  const { clearCart } = useCartService();

  return useMutation({
    mutationFn: clearCart, 
    onSuccess: (data) => {
      console.log("Cart cleared successfully:", data);
     },
    onError: (error) => {
      console.error("Error clearing cart:", error);
     },
  });
};
