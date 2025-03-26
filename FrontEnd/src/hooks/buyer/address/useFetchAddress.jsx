import { useQuery } from '@tanstack/react-query';
import { useAddressService } from "../../../services/buyer/buyerServices";

export const useFetchAddress = () => {
  const { getLocationById } = useAddressService();

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ['address'],
    queryFn: () => {
      return getLocationById();
    },
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
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
