import { useMutation} from "@tanstack/react-query";
import { useAddressService } from "../../../services/buyer/buyerServices";

export const useEditAddress = () => {
  const { updateAddress } = useAddressService();
  return useMutation({
    mutationFn: ({id,street, state, city, phoneNumber }) =>
      updateAddress(id, street, state, city, phoneNumber),
  }
);
};
