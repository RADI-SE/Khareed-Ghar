import { useQuery } from '@tanstack/react-query';
import { useCartService } from "../../../services/buyer/buyerServices";

export const useFetchCartItems = () => {
    const { displayCart } = useCartService();
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => displayCart(),
    staleTime: 1000, // Data is always considered stale, so it fetches fresh data.
    refetchInterval: 1000, // Refetch every 5 seconds.
    refetchIntervalInBackground: true, // Keep refetching even if the browser tab is inactive.
  });
};
