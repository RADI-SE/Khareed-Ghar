import { useQuery } from '@tanstack/react-query';
import { useAdminService } from '../../../services/buyer/adminServices';
 
export const useFetchCartItems = (id) => {
    const { displayCart } = useAdminService();
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => displayCart(id),
    staleTime: 1000, // Data is always considered stale, so it fetches fresh data.
    refetchInterval: 1000, // Refetch every 5 seconds.
    refetchIntervalInBackground: true, // Keep refetching even if the browser tab is inactive.
  });
};
