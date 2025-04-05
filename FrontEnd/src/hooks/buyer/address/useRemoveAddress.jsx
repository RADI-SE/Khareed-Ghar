import { useMutation } from "@tanstack/react-query";
import { useAddressService } from "../../../services/buyer/buyerServices";


// useRemoveFromAddress Hook
export const useRemoveAddress = () => {
  const { removeAddress } = useAddressService();   
  return useMutation({
    mutationFn: ({ addressId }) => removeAddress( addressId),
  
  });
};
