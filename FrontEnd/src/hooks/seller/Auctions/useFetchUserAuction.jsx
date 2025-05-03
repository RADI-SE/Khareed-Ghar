import { useQuery } from '@tanstack/react-query';
import { useSellerService } from "../../../services/seller/sellerServices";

export const useFetchUserAuction = (sellerId) => {
  const { getUserAuction } = useSellerService();
  return useQuery({
    queryKey: ['auction', sellerId], 
    queryFn: () => getUserAuction(sellerId),
    enabled: !!sellerId,
  });
};

