import { useQuery } from '@tanstack/react-query';
import { useAdminService } from "../../services/adminServices";

export const useFetchCategories = (token) => {
    const { displayCategories } = useAdminService();
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => displayCategories(token),
    staleTime: 0, 
    refetchInterval: 5000,
    refetchIntervalInBackground: true, 
    
  });
};
