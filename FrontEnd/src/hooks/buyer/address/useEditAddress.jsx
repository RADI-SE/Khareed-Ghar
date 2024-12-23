import { useMutation } from "@tanstack/react-query"; 
import { useAddressService }from "../../../services/buyer/buyerServices"


export const useEditAddress = () => {
  const { updateAddress } = useAddressService();
  return useMutation({
    mutationFn: ({ userId, street, LOCATION, phoneNumber, id }) =>
      updateAddress(
        userId, street, LOCATION, phoneNumber, id
      ),
    onSuccess: () => {
      console.log("Address updated successfully.");
    },
  });
};
