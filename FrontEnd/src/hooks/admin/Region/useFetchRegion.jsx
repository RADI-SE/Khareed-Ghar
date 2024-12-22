import { useQuery } from '@tanstack/react-query';
import { useAdminService } from "../../../services/admin/useRegionServices/useRegionServices";

export const useFetchRegion = () => {
    const { getRegion } = useAdminService();
  return useQuery({
    queryKey: ['zoon'],
    queryFn: () => getRegion(),
    staleTime: 0, 
    refetchInterval: 5000,  
    refetchIntervalInBackground: true,  
  });
};
