import { useQuery } from '@tanstack/react-query';
import { useAdminService } from "../../../services/adminServices";

export const useFetchNotifications = () => {
  const { getAdminNotifications } = useAdminService();
  return useQuery({
    queryKey: ['notifications'], 
    queryFn: () => getAdminNotifications(),
    staleTime: 1000,   
    refetchInterval: 1000,  
    refetchIntervalInBackground: true,
  });
  
};
