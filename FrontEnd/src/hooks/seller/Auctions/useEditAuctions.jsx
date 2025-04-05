import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSellerService } from "../../../services/seller/sellerServices";

export const useEditAuctions = () => {
  const { editAuctions } = useSellerService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, startTime, endTime }) =>
      editAuctions(
        id,
        startTime,
        endTime

      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["auctions"]);
    },
  });
};
