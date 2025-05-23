import { useMutation } from "@tanstack/react-query";
import { useSellerService } from "../../../services/seller/sellerServices";

export const useCreateAuction = () => {
  const { createAuction } = useSellerService();

  return useMutation({
    mutationFn: ({

      productId,
      startingBid,
      startTime,
      endTime,
    }) => {
      return createAuction(
        productId,
        startingBid,
        startTime,
        endTime,
      );
    },

  });
};
