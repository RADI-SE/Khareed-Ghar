import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../../services/admin/useRegionServices/useRegionServices";

export const useCreateRegion = () => {
  const { addRegion } = useAdminService();

  return useMutation({
    mutationFn: ({  id, state, city }) => {
       return addRegion( id, state, city);
    },
  });
};
