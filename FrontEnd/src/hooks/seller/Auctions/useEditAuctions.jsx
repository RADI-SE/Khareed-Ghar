import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSellerService } from "../../../services/seller/sellerServices";

export const useEditAuctions = (token) => {
  const { editAuctions } = useSellerService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, startTime, endTime }) =>
      editAuctions(
        token,
        id,
        // name,
        // description,
        // specifications,
        // price,
        // category,
        // seller,
        // images

        startTime,
        endTime

      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["auctions"]);
      console.log("AuctionsSSSSS");
    },
  });
};
