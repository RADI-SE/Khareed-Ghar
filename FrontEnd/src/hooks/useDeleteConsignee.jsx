import { useMutation } from "@tanstack/react-query";
import { useConsigneeService } from "../services/consignee/consigneeServices";

export const useDeleteConsignee = () => {
  const { deleteConsignee } = useConsigneeService();
  return useMutation({
    mutationFn: ({ id }) => 
      deleteConsignee( id),  
  });
};
