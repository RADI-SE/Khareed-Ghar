import { useQuery } from '@tanstack/react-query';
import { useAddressService } from "../../../services/buyer/buyerServices";

export const useFetchAddress = () => {
  const { getLocationById } = useAddressService();

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ['address'],
    queryFn: () => {
      return getLocationById();
    },
  
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  return {
    data,
    isLoading,
    error,
    refetch
  };
};
