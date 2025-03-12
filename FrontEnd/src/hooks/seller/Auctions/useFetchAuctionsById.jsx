import { useQuery } from '@tanstack/react-query';
import { useSellerService } from "../../../services/seller/sellerServices";

export const useFetchAuctionsById = (id) => {
  console.log("id from Auction useFetchById 3:",id);
  const { getAuctionsById } = useSellerService();
  return useQuery({
    queryKey: ['auction', id], 
    queryFn: () => getAuctionsById(id),
    enabled: !!id,
  });
};
