import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";

export const useDeleteCategory = (token) => {
  const { deleteCategories } = useAdminService();
  return useMutation({
    mutationFn: ({ name, categoryId }) => 
      deleteCategories(token, name, categoryId),  
    onSuccess: () => {
      console.log("Category deleted successfully.");
    },
    onError: (error) => {
      console.error(
        "Failed to delete category: ",
        error?.response?.data?.message || "An error occurred."
      );
    },
  });
};
