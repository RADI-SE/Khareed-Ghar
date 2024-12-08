import { useQuery } from "@tanstack/react-query";
import { useAdminService } from "../../services/adminServices";

export const useGetAllCategoryProducts = (id) => {
  const { getAllCategoryProducts } = useAdminService();

  return useQuery({
    queryKey: ['getAllCategoryProducts', id?.selectedCategory],
    queryFn: async () => {
      if (!id?.selectedCategory) {
        console.log("No category selected.");
        return [];
      }
      try {
        const response = await getAllCategoryProducts({ selectedCategory: id.selectedCategory });
        console.log("Response from API:", response);

        return response || [];
      } catch (error) {
        console.error("Error during fetching:", error);
        return [];
      }
    },
    staleTime: 5000,
    refetchInterval: 10000,
  });
};

