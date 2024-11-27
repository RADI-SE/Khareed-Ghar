import { useQuery } from '@tanstack/react-query';
import { useAdminService } from "../../services/adminServices";

export const useFetchSubCategories = (token , selectedCategory_id) => {
    const { getSubCategories } = useAdminService();
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getSubCategories(token, selectedCategory_id),
    
    staleTime: 0, // Data is always considered stale, so it fetches fresh data.
    refetchInterval: 5000, // Refetch every 5 seconds.
    refetchIntervalInBackground: true, // Keep refetching even if the browser tab is inactive.
    
  });
};
