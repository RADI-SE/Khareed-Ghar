// /get-category-byId/:id

import { useQuery } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";

export const useGetCategoryById = (id) => {
  const { getCategoryById } = useAdminService();

  return useQuery({
    queryKey: ['getCategoryById', id?.selectedCategory],
    queryFn: async () => {
      if (!id?.selectedCategory) {
        return [];
      }
      try {
        const response = await getCategoryById({ selectedCategory: id.selectedCategory });
        return response || [];
      } catch (error) {
        
        return [];
      }
    },
    staleTime: 5000,
    refetchInterval: 10000,
  });
};

