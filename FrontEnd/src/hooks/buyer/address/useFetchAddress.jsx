import { useQuery } from '@tanstack/react-query';
import { useAddressService } from "../../../services/buyer/buyerServices";

export const useFetchAddress = () => {
  const { getLocationById } = useAddressService();

  return useQuery({
    queryKey: ['data'], // Dynamic queryKey
    queryFn: () => {
      return getLocationById();
    },
    staleTime: 1, 
    refetchInterval: 1, 
    refetchIntervalInBackground: true, 
  });
};
