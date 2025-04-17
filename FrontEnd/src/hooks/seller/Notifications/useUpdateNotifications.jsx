import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSellerService } from "../../../services/seller/sellerServices";

export const useUpdateNotifications = () => {
  const { updateNotification } = useSellerService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id  , read}) =>
      updateNotification(
        id,
        read,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });
};
