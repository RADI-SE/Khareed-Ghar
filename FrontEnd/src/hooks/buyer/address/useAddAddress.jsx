import { useMutation } from "@tanstack/react-query";
import { useAddressService } from "../../../services/buyer/buyerServices";

export const useAddAddress = () => {
  const { createLocation } = useAddressService();
  return useMutation({
    mutationFn: async ({ userId , userName, phone,  LOCATION,  state, area, postalCode, addressDetails }) => {
      try {
        const response = await createLocation(userId , userName, phone,  LOCATION,  state, area, postalCode, addressDetails);
        return response;
      } catch (error) {
        console.error("Error during createLocation API call:", error);
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
