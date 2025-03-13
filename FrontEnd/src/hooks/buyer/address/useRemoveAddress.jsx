import { useMutation } from "@tanstack/react-query";
import { useAddressService } from "../../../services/buyer/buyerServices";


// useRemoveFromAddress Hook
export const useRemoveAddress = () => {
  const { removeAddress } = useAddressService();  
  console.log("Hi from useRemoveAddress");  
  return useMutation({
    mutationFn: ({ addressId }) => removeAddress( addressId),
    
    onSuccess: () => {
      console.log("Address removed successfully.");
    },

    onError: (error) => {
      console.error(
        "Failed to remove address: ",
        error?.response?.data?.message || "An unexpected error occurred."
      );
    },
  });
};
