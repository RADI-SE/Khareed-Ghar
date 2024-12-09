import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../../services/admin/useZoonServices/useZoonServices";


export const useDeleteZoon = () => {
  const { deleteZoon } = useAdminService();
  return useMutation({
    mutationFn: ({ id , district}) => 
      deleteZoon( id, district),  
  });
};
