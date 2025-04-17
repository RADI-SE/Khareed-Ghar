import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSellerService } from "../../../services/seller/sellerServices";

export const useUpdateNotifications = () => {
  const { updateBuyerNotification } = useSellerService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id  , read}) =>
      updateBuyerNotification(
        id,
        read,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });
};
