import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddressService } from "../../../services/buyer/buyerServices";

export const useEditAddress = () => {
  const { updateAddress } = useAddressService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, street, state, city, phoneNumber }) =>
      updateAddress(id, street, state, city, phoneNumber),
    onSuccess: () => {
      queryClient.invalidateQueries(['address']);
    },
    onError: (error) => {
      console.error("Error updating address:", error);
    }
  });
};