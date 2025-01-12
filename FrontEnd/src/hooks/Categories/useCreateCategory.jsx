import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";

export const useCreateCategory = () => {
  const { AddCategoriesForm } = useAdminService();

  return useMutation({
    mutationFn: ({ token, name, description }) =>
      AddCategoriesForm(token, name, description),
  });
};
