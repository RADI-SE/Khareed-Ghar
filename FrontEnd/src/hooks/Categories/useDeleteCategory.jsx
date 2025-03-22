import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";

export const useDeleteCategory = (token) => {
  const { deleteCategories } = useAdminService();
  return useMutation({
    mutationFn: ({ name, categoryId }) => 
      deleteCategories(token, name, categoryId),  
 
  });
};
