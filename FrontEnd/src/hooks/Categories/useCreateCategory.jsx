import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";

export const useCreateCategory = () => {
  const { AddCategoriesForm } = useAdminService();

  return useMutation({
    mutationFn: ({ token, name, description }) =>
      AddCategoriesForm(token, name, description),
    onSuccess: () => {
      console.log("Category created successfully.");
    },
    onError: (error) => {
      console.error("Error creating category:", error);
    },
  });
};
