import { useQuery } from '@tanstack/react-query';
import { useAddressService } from "../../../services/buyer/buyerServices";

export const useFetchAddress = (userId) => {
  const { getLocationById } = useAddressService();

  return useQuery({
    queryKey: ['location', userId], // Dynamic queryKey
    queryFn: () => {
      return getLocationById(userId);
    },
    staleTime: 5000, // Data is considered stale after 5 seconds
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: true, // Refetch in the background
  });
};
