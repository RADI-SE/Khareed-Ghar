import { useMutation } from "@tanstack/react-query";
import { useAddressService } from "../../../services/buyer/buyerServices";
export const useAddAddress = () => {
  const { createLocation } = useAddressService();

  return useMutation({
    mutationFn: async ({ street, state, city, phoneNumber }) => {
      console.log("Submitting Address:", { street, state, city, phoneNumber });
      const response = await createLocation(street, state, city, phoneNumber );
      return response;
    },
    onSuccess: (data) => {
      console.log("createLocation successfully:", data);
    },
    onError: (error) => {
      console.error("Error encountered while createLocation:", error.message);
    },
  });
};
