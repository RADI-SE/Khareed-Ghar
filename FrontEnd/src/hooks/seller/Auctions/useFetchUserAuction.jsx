import { useQuery } from '@tanstack/react-query';
import { useSellerService } from "../../../services/seller/sellerServices";

export const useFetchUserAuction = () => {
  console.log("id from useFetchById:");
  const { getUserAuction } = useSellerService();
  return useQuery({
    queryKey: ['auction'], 
    queryFn: () => getUserAuction(),


  });
};

