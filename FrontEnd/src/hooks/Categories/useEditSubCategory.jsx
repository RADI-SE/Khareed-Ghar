import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";

export const useEditSubCategory = (token) => {
  const { EditSubCategoriesForm } = useAdminService();
  return useMutation({
    mutationFn: ({ SubCategoryId, CategoryId, CategoryName, description }) =>
      EditSubCategoriesForm(
        token,
        SubCategoryId,
        CategoryId,
        CategoryName,
        description
      ),
 
  });
};
