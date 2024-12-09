import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminService } from "../../../services/admin/useZoonServices/useZoonServices";

export const useEditZoon = (token) => {
  const { editZoon } = useAdminService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, district, city }) => {
      return await editZoon(id, district, city);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["zoon"]);
    },
    onError: (error) => {
      console.error("Mutation failed:", error.message);
    },
  });
};
