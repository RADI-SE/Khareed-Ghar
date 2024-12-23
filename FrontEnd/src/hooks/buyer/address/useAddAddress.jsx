import { useMutation } from "@tanstack/react-query";
import { useAddressService } from "../../../services/buyer/buyerServices";

export const useAddAddress = () => {
  const { createLocation } = useAddressService();
  return useMutation({
    mutationFn: async ({ userId, street, LOCATION, phoneNumber}) => {
      try {
        const response = await createLocation(userId, street, LOCATION, phoneNumber);
        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("createLocation successfully:", data);
    },
    onError: (error) => {
      console.error("Error encountered while createLocation:", error.message);
    },
  });
};
