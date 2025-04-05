import { useQuery } from '@tanstack/react-query';
import { useSellerService } from "../../../services/seller/sellerServices";

export const useFetchUserAuction = () => {
  const { getUserAuction } = useSellerService();
  return useQuery({
    queryKey: ['auction'], 
    queryFn: () => getUserAuction(),


  });
};

