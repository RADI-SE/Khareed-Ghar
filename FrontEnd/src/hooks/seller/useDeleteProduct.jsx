import { useMutation } from "@tanstack/react-query";
import { useSellerService } from "../../services/seller/sellerServices";

export const useDeleteProduct = (token) => {
  const { deleteProduct } = useSellerService();
  return useMutation({
    mutationFn: ({ id , name}) => 
      deleteProduct(token, id, name),  
    
  });
  
};
