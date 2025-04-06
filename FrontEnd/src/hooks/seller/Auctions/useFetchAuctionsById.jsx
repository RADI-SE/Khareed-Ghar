import { useQuery } from '@tanstack/react-query';
import { useSellerService } from "../../../services/seller/sellerServices";

export const useFetchAuctionsById = (id) => {
  const { getAuctionsById } = useSellerService();
  return useQuery({
    queryKey: ['auction', id], 
    queryFn: () => getAuctionsById(id),
    enabled: !!id,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};
