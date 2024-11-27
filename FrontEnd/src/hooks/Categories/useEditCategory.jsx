import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";


export const useEditCategory = (token) => {
  const { EditCategoriesForm } = useAdminService();
  return useMutation({
    mutationFn: ({ CategoryId, CategoryName, description }) =>
        EditCategoriesForm(
        token,
        CategoryId,
        CategoryName,
        description
      ),
    onSuccess: () => {
      console.log("Category updated successfully.");
    },
  });
};
