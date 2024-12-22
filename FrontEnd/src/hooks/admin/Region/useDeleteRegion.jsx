import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../../services/admin/useRegionServices/useRegionServices";


export const useDeleteRegion = () => {
  const { deleteRegion } = useAdminService();
  return useMutation({
    mutationFn: ({ id , state}) => 
      deleteRegion( id, state),  
  });
};
