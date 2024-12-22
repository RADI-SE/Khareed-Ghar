import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminService } from "../../../services/admin/useRegionServices/useRegionServices";

export const useEditRegion = (token) => {
  const { editRegion } = useAdminService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, state, city }) => {
      return await editRegion(id, state, city);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["zoon"]);
    },
    onError: (error) => {
      console.error("Mutation failed:", error.message);
    },
  });
};
