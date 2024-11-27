import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";
export const useCreateSubCategory = (token) => {
  const { AddSubCategoriesForm } = useAdminService();
  return useMutation({
    mutationFn: ({ name, description, CategoryId }) =>
      AddSubCategoriesForm(token, name, description, CategoryId),
    onSuccess: () => {
      console.log("Category updated successfully.");
    },
  });
};
