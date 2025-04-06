import { useMutation } from "@tanstack/react-query";
import { useSellerService } from "../../../services/seller/sellerServices";

export const useBidNow = () => {
  const { bidAuction } = useSellerService();

  return useMutation({
    mutationFn: ({
      auctionId,
      bidAmount,
    }) => {
      return bidAuction(
        auctionId,
        bidAmount,
      );
    },

  });
};
