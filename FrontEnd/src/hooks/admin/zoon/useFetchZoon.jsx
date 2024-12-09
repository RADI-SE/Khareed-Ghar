import { useQuery } from '@tanstack/react-query';
import { useAdminService } from "../../../services/admin/useZoonServices/useZoonServices";

export const useFetchZoon = () => {
    const { getZoon } = useAdminService();
  return useQuery({
    queryKey: ['zoon'],
    queryFn: () => getZoon(),
    staleTime: 0, 
    refetchInterval: 5000,  
    refetchIntervalInBackground: true,  
  });
};
