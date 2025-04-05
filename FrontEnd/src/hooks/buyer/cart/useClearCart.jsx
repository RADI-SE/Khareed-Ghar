import { useMutation } from "@tanstack/react-query";
import { useCartService } from "../../../services/buyer/buyerServices";

export const useClearCart = () => {
  const { clearCart } = useCartService();

  return useMutation({
    mutationFn: clearCart, 
 
  });
};
