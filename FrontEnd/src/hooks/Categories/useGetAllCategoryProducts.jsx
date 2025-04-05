import { useQuery } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";

export const useGetAllCategoryProducts = (id) => {
  const { getAllCategoryProducts } = useAdminService();

  return useQuery({
    queryKey: ['getAllCategoryProducts', id?.selectedCategory],
    queryFn: async () => {
      if (!id?.selectedCategory) {
         return [];
      }
      try {
        const response = await getAllCategoryProducts({ selectedCategory: id.selectedCategory });

        return response || [];
      } catch (error) {
        return [];
      }
    },
    staleTime: 5000,
    refetchInterval: 10000,
  });
};

