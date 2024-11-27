import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";

export const useDeleteSubCategory = (token) => {
  const { deleteSubCategories } = useAdminService();

  return useMutation({
    mutationFn: ({ categoryId, subcategoryId }) => 
      deleteSubCategories(token, categoryId, subcategoryId),  
    onSuccess: () => {
      console.log("Subcategory deleted successfully");
    },
    onError: () => {
      console.log("Failed to delete subcategory");
    },
  });
};
